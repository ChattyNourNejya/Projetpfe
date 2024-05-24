import { Component, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Calendar } from './calendar.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from './room';
import { LeService } from '../patient/entities/LeService';
import { ServiceZone } from './service-zone';
import { FunctionalUnit } from './functional-unit';
import { RoomGroup } from './room-group';
import { MatDialog } from '@angular/material/dialog';
import { CalendarService } from './calendar.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  @ViewChild('calendar', { static: false })
  calendar: Calendar | null;
  public addCusForm: FormGroup;
  dialogTitle: string;
  calendarData!: Calendar;
  rooms: Room[] = [];
  addLeserviceForm!: FormGroup;
  Leservice1!: FormGroup;
  stayPertinentService: LeService[] = [];
  serviceZones: ServiceZone[] = [];
  selectedService: LeService | undefined;
  selectedServiceId: number | null;
  selectedServiceZoneId: number | null;
  selectedFunctionalUnitId: number | null;
  selectedServiceZone: ServiceZone | undefined;
  functionalUnits: FunctionalUnit[] = [];
  RoomGroups: RoomGroup[] = [];
  functionalUnitId: number | null;
  selectedRoomGroupId: number | null;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public calendarService: CalendarService,
    private snackBar: MatSnackBar
  ) {
    super();
    this.dialogTitle = 'Add New Event';
    const blankObject = {} as Calendar;
    this.calendar = new Calendar(blankObject);
    this.addCusForm = this.createCalendarForm(this.calendar);
    this.selectedServiceId = null;
    this.functionalUnitId = null;
    this.selectedFunctionalUnitId = null;
    this.selectedRoomGroupId = null;
    this.selectedServiceZoneId = null;
    this.addLeserviceForm = this.fb.group({
      service_Nm: [''],
    });
    this.Leservice1 = this.fb.group({
      serviceZone: [''],
      functionalUnit: [''],
      roomGroup: [''],
      rooms: [''],
    });
  }

  ngOnInit(): void {
    this.calendarOptions.initialEvents = [];
    this.getService();
  }

  loadRooms(groupId: number) {
    this.calendarService.getRoomsByGroupId(groupId).subscribe(
      (rooms: Room[]) => {
        this.rooms = rooms;
      },
      (error) => {
        console.error('Error retrieving rooms:', error);
      }
    );
  }

  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      interactionPlugin,
      resourceTimeGridPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    resources: [],
    initialView: 'resourceTimeGridDay',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.addNewEvent.bind(this),
    dateClick: this.addNewEvent.bind(this),
  };


  getResources(): any[] {
    return [
      {
        id: 'a',
        title: 'Room A',
      },
      {
        id: 'b',
        title: 'Room B',
      },
      {
        id: 'c',
        title: 'Room C',
      },
    ];
  }

  addNewEvent() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: this.calendar,
        action: 'add',
      },
      direction: tempDirection,
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 'submit') {
        this.calendarData = this.calendarService.getDialogData();
        console.log(this.calendarData.startDate);
        this.addCusForm.reset();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  createCalendarForm(calendar: Calendar): FormGroup {
    return this.fb.group({
      id: [calendar.id],
      title: [
        calendar.title,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      category: [calendar.category],
      startDate: [calendar.startDate, [Validators.required]],
      endDate: [calendar.endDate, [Validators.required]],
      details: [
        calendar.details,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ['snackbar-error'],
    });
  }

  getService() {
    this.calendarService.getService().subscribe(
      (data: LeService[]) => {
        this.stayPertinentService = data;
      },
      (error: any) => {
        console.error('Error retrieving services:', error);
        this.openErrorSnackBar('Error retrieving services');
      }
    );
  }

  getServiceZoneByService(serviceId: number) {
    this.calendarService.getServiceZoneByService(serviceId).subscribe(
      (data: ServiceZone[]) => {
        this.serviceZones = data;
      },
      (error: any) => {
        console.error('Error retrieving service zones:', error);
        this.openErrorSnackBar('Error retrieving service zones');
      }
    );
  }

  getFunctionalUnitsByServiceZone(selectedServiceZoneId: number) {
    this.calendarService
      .getFunctionalUnitsByServiceZone(selectedServiceZoneId)
      .subscribe(
        (data: FunctionalUnit[]) => {
          this.functionalUnits = data;
        },
        (error: any) => {
          console.error('Error retrieving functional units:', error);
          this.openErrorSnackBar('Error retrieving functional units');
        }
      );
  }

  getRoomGroupsByFunctionalUnit(selectedFunctionalUnitId: number) {
    this.calendarService
      .getRoomGroupsByFunctionalUnit(selectedFunctionalUnitId)
      .subscribe(
        (data: RoomGroup[]) => {
          this.RoomGroups = data;
        },
        (error: any) => {
          console.error('Error retrieving RoomGroups:', error);
          this.openErrorSnackBar('Error retrieving RoomGroups');
        }
      );
  }

  onServiceSelected(selectedServiceId: number) {
    this.selectedServiceId = selectedServiceId;
    this.getServiceZoneByService(selectedServiceId);
  }

  onNext1() {
    if (this.selectedServiceId) {
      this.getServiceZoneByService(this.selectedServiceId);
    }
  }

  onServiceZoneSelected(selectedServiceZoneId: number) {
    this.selectedServiceZoneId = selectedServiceZoneId;
    this.getFunctionalUnitsByServiceZone(selectedServiceZoneId);
  }

  getRoomsByRoomGroup(selectedRoomGroupId: number) {
    this.calendarService.getRoomsByGroupId(selectedRoomGroupId).subscribe(
      (data: Room[]) => {
        this.rooms = data;
        this.updateCalendarWithRooms(this.rooms);
      },
      (error: any) => {
        console.error('Error retrieving Rooms:', error);
        this.openErrorSnackBar('Error retrieving Rooms');
      }
    );
  }

  updateCalendarWithRooms(rooms: Room[]) {
    const resources = rooms.map((room) => ({
      id: room.room_Ky.toString(),
      title: room.room_Nm,
    }));

    this.calendarOptions = {
      ...this.calendarOptions,
      resources: resources,
    };
  }

  onNext2() {
    if (this.selectedServiceZoneId) {
      this.getFunctionalUnitsByServiceZone(this.selectedServiceZoneId);
    }
  }

  onfunctionalUnitSelected(selectedFunctionalUnitId: number) {
    this.selectedFunctionalUnitId = selectedFunctionalUnitId;
    this.getRoomGroupsByFunctionalUnit(this.selectedFunctionalUnitId);
  }

  onNext3() {
    if (this.selectedFunctionalUnitId) {
      this.getRoomGroupsByFunctionalUnit(this.selectedFunctionalUnitId);
    }
  }

  onRoomGroupSelected(selectedRoomGroupId: number) {
    this.selectedRoomGroupId = selectedRoomGroupId;
    this.getRoomsByRoomGroup(this.selectedRoomGroupId);
  }

  save() {
    if (this.selectedRoomGroupId) {
      this.getRoomsByRoomGroup(this.selectedRoomGroupId);
    }
  }
}
