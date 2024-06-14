import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarService } from '../calendar.service';
import { Calendar } from '../calendar.model';
import { MedicalAct } from '../medical-act';
import { EventInput } from '@fullcalendar/core';

export interface DialogData {
  id: number;
  action: string;
  calendar: Calendar;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  action: string;
  dialogTitle: string;
  calendarForm: UntypedFormGroup;
  calendar: Calendar;
  appointment: any = [];
  patients: any = [];
  showDeleteBtn = false;

  medicalActs: MedicalAct[] = [];
  medicalActTypes: string[] = [
    'Consultation',
    'Diagnostic_Test',
    'Surgical_procedure',
    'Physical_Therapy',
    'Emergency_care',
  ];
  statusOptions = ['Planned', 'RePlanned', 'Cancelled'];
  calendarOptions: any;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public calendarService: CalendarService,
    private fb: UntypedFormBuilder
  ) {

      this.calendarForm = this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        Patient: ['', Validators.required],
        MedicalAct: ['', Validators.required],
        Status: ['', Validators.required],
        MedicalActType: ['', Validators.required],
      });
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.calendar.title;
      this.calendar = data.calendar;
      this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'Add Appointment';
      const blankObject = {} as Calendar;
      this.calendar = new Calendar(blankObject);
      this.showDeleteBtn = false;
    }
    this.calendarForm = this.createContactForm();
  }

  ngOnInit(): void {
    this.calendarService.getPatients().subscribe((patients) => {
      this.patients = patients;
    });

    this.calendarService.getMedicalActs().subscribe((medicalActs) => {
      this.medicalActs = medicalActs;
    });
    
  }

  formControl = new UntypedFormControl('', [Validators.required]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.calendar.id],
      startDate: [
        this.appointment.medVisitSchld_UnxTmBgn,
        [Validators.required],
      ],
      endDate: [this.appointment.medVisitSchdld_UnxTmEnd],
      Patient: [
        this.appointment.medVisitSchdld_PatientKy,
        [Validators.required],
      ],
      MedicalAct: [
        this.appointment.medVisitSchdld_MedActKy,
        [Validators.required],
      ],
      Status: [this.appointment.medVisitSchdld_Status],

      MedicalActType: ['', [Validators.required]],
    });
  }

  submit() {
    console.log('Submit clicked', this.calendarForm);
    let dataA = {
      medVisitSchdld_PatientKy: {
        patientKy: this.calendarForm.value.Patient,
      },
      medVisitSchld_UnxTmBgn: this.calendarForm.value.startDate,
      medVisitSchdld_UnxTmEnd: this.calendarForm.value.endDate,
      medVisitSchdld_Status: this.calendarForm.value.Status,
      medVisitSchdld_MedActKy: {
        medicalAct_Ky: this.calendarForm.value.MedicalAct,
      },
    };
    if (this.calendarForm.valid) {
      console.log(dataA);
      this.calendarService.createMedVisitSchdld(dataA).subscribe(
        (response) => {
          console.log('Appointment created successfully', response);
          this.dialogRef.close('submit');
        },
        (error) => {
          console.error('Error creating appointment', error);
        }
      );
    }
  }


  deleteEvent() {
    this.calendarService.deleteCalendar(this.calendarForm.getRawValue());
    this.dialogRef.close('delete');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.calendarService.addUpdateCalendar(this.calendarForm.getRawValue());
    this.dialogRef.close('submit');
  }
}
