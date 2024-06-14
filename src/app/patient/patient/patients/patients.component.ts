import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Patient } from '../entities/patient';
import { Gender } from '../entities/gender';
import { PatientService } from '../service/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DeleteComponent } from '../delete/delete.component';
import { PatientStatus } from '../entities/patient-status';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  action!: string;
  // onCloseVar: boolean=false;
  onclose() {
    this.hide = true;
  }

  hide!: boolean;
  page = 1;
  items = 7;
  filteredPatients: Patient[] = [];
  patients: Patient[] = [];
  isLoading: boolean = false;
  showFilters = false;
  patientFirstNameQuery = '';
  patientLastNameQuery = '';

  patientNameQuery = '';
  patientDobQuery = '';
  genderQuery = '';
  statusQuery = '';

  patientIdQuery = '';
  civilStatusQuery = '';
  nationnalityQuery = '';
  genders = Object.values(Gender);
  status = Object.values(PatientStatus);
  onViewVar: boolean = false;
  archivedPatients$: Observable<Patient[]> = new Observable<Patient[]>(); // Initialisation avec une nouvelle instance Observable

  constructor(
    private patientService: PatientService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.patientService.retrievePatients().subscribe((data) => {
      this.filteredPatients = data;
      this.patients = data;
      console.log(data);
    });
  }

  refresh() {
    this.getPatientList();
  }

  getPatientList() {
    this.patientService.retrievePatients().subscribe((data) => {
      this.filteredPatients = data;
      this.patients = data;
    });
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ['snackbar-success'],
    });
  }

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ['snackbar-error'],
    });
  }
  disablePatient(patientKey: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will disable the patient. Do you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, disable it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.patientService.disablePatient(patientKey).subscribe(
          () => {
            this.openSuccessSnackBar('Patient disabled');
            // Mettre à jour le statut du patient localement
            const patientToUpdate = this.filteredPatients.find(
              (p) => p.patientKy === patientKey
            );
            if (patientToUpdate) {
              patientToUpdate.patientStatus = PatientStatus.Anonymous;
            }
          },
          (error) => {
            console.log(error);
            this.openErrorSnackBar('Error disabling patient');
          }
        );
      }
    });
  }

  enablePatient(patientKey: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will enable the patient. Do you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, enable it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.patientService.enablePatient(patientKey).subscribe(
          () => {
            this.openSuccessSnackBar('Patient enabled');
            // Mettre à jour le statut du patient localement
            const patientToUpdate = this.filteredPatients.find(
              (p) => p.patientKy === patientKey
            );
            if (patientToUpdate) {
              patientToUpdate.patientStatus = PatientStatus.Valid;
            }
          },
          (error) => {
            console.log(error);
            this.openErrorSnackBar('Error enabling patient');
          }
        );
      }
    });
  }
  patient!: Patient;

  addNewPatient() {
    // let tempDirection: Direction;
    // if (localStorage.getItem('isRtl') === 'true') {
    //   tempDirection = 'rtl';
    // } else {
    //   tempDirection = 'ltr';
    // }
    // const dialogRef = this.dialog.open(AddpatientComponent, {
    //   data: {
    //     patients: this.patients,
    //     action: 'add-patient',
    //   },
    //   direction: tempDirection,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result !== undefined) {
    //     this.openSuccessSnackBar("Patient Added Successfully !")
    //     this.patients.push(result);
    //     this.refresh();
    //     this.cdr.detectChanges();
    //   }
    // });
    // this.patient={} as Patient;
    //  this.onViewVar=true;
    // //this.onCloseVar=false;
    // this.action="OnAdd";
    // this.hide=false;
    this.router.navigate(['/add_patient']);
  }
  onView(patient: Patient) {
    console.log(patient.patientStatus);
    //this.onCloseVar=false;
    this.patient = patient;
    console.log(patient);
    this.onViewVar = true;
    this.action = 'onViewPatient';
    this.hide = false;
  }

  onDelete(patient: Patient): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: 'Êtes-vous sûr de vouloir supprimer ce patient ?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.patientService.deletePatient(patient.patientKy).subscribe(
          () => {
            this.showNotification(
              'snackbar-success',
              'Patient deleted successfully!',
              'bottom',
              'right'
            );
            // Mettre à jour la liste des patients après la suppression réussie
            this.searchPatients();
          },
          (error: any) => {
            console.error('Error deleting patient:', error);
            this.showNotification(
              'snackbar-error',
              'Error deleting patient!',
              'top',
              'right'
            );
          }
        );
      }
    });
  }

  showNotification(
    panelClass: string,
    message: string,
    verticalPosition: any,
    horizontalPosition: any
  ): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      panelClass: [panelClass],
    });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  searchPatients(): void {
    this.filteredPatients = this.patients.filter((patient) =>
      this.matchesCriteria(patient)
    );
    this.page = 1;
  }

  private matchesCriteria(patient: Patient): boolean {
    const criteria: boolean[] = [];

    if (this.patientNameQuery) {
      criteria.push(this.matchesPatientName(patient));
    }
    if (this.patientLastNameQuery) {
      criteria.push(this.matchesPatientLastName(patient));
    }
    if (this.patientFirstNameQuery) {
      criteria.push(this.matchesPatientFirstName(patient));
    }

    if (this.patientDobQuery) {
      criteria.push(this.matchesPatientDOB(patient));
    }

    if (this.genderQuery) {
      criteria.push(this.matchesGender(patient));
    }
    if (this.statusQuery) {
      criteria.push(this.matchesStatus(patient));
    }

    if (this.patientIdQuery) {
      criteria.push(this.matchesPatientId(patient));
    }

    // If at least one criterion is met, the study is included
    return criteria.length === 0 || criteria.every((result) => result);
  }

  private matchesPatientName(patient: Patient): boolean {
    const fullName = `${patient.patientFirstName} ${patient.patientLastName} `;
    return (
      fullName.toLowerCase().includes(this.patientNameQuery.toLowerCase()) ||
      fullName.toLowerCase().includes(this.patientNameQuery.toLowerCase())
    );
  }
  private matchesPatientFirstName(patient: Patient): boolean {
    const fullName = `${patient.patientFirstName}`;
    return (
      fullName
        .toLowerCase()
        .includes(this.patientFirstNameQuery.toLowerCase()) ||
      fullName.toLowerCase().includes(this.patientFirstNameQuery.toLowerCase())
    );
  }
  private matchesPatientLastName(patient: Patient): boolean {
    const fullName = ` ${patient.patientLastName}`;
    return (
      fullName
        .toLowerCase()
        .includes(this.patientLastNameQuery.toLowerCase()) ||
      fullName.toLowerCase().includes(this.patientLastNameQuery.toLowerCase())
    );
  }

  private matchesPatientDOB(patient: Patient): boolean {
    const studyDOB = new Date(patient.patientBirthDate).toLocaleDateString(
      'en-GB',
      { day: '2-digit', month: '2-digit', year: 'numeric' }
    );
    return (
      studyDOB === new Date(this.patientDobQuery).toLocaleDateString('en-GB')
    );
  }

  private matchesGender(patient: Patient): boolean {
    const patientGender = patient.patientGender;
    const queryGender = this.genderQuery.toLowerCase();

    return (
      (patientGender === this.genders[0] && queryGender === 'male') ||
      (patientGender === this.genders[1] && queryGender === 'female') ||
      (patientGender === this.genders[2] && queryGender === 'other')
    );
  }

  private matchesStatus(patient: Patient): boolean {
    const patientStatus = patient.patientStatus;
    const queryStatus = this.statusQuery.toUpperCase();

    return (
      (patientStatus === this.status[0] && queryStatus === 'VALID') ||
      (patientStatus === this.status[1] && queryStatus === 'PROVISIONAL') ||
      (patientStatus === this.status[2] && queryStatus === 'PROVISIONAL')
    );
  }

  private matchesPatientId(patient: Patient): boolean {
    const patientId = patient.patientIdentityNumber.toLowerCase();

    return patientId.toLowerCase().includes(this.patientIdQuery.toLowerCase());
  }

  clearPatientName() {
    this.patientNameQuery = '';
    this.searchPatients();
  }

  clearPatientId() {
    this.patientIdQuery = '';
    this.searchPatients();
  }

  clearPatientCivilStatus() {
    this.civilStatusQuery = '';
    this.searchPatients();
  }

  clearPatientNationnality() {
    this.nationnalityQuery = '';
    this.searchPatients();
  }

  clearPatientFirstName() {
    this.patientFirstNameQuery = '';
    this.searchPatients();
  }

  clearPatientLastName() {
    this.patientLastNameQuery = '';
    this.searchPatients();
  }

  getPatientStatusIndex(status: PatientStatus): number {
    return Object.values(PatientStatus).indexOf(status);
  }
  modify(patient: Patient) {
    console.log(patient.patientStatus);
    if (patient.patientStatus === PatientStatus.Valid) {
      this.disablePatient(patient.patientKy);
    } else {
      this.enablePatient(patient.patientKy);
    }
  }

  // New method to archive a patient
  archivePatient(patient: Patient): void {
    this.patientService.archivePatient(patient);
    this.filteredPatients = this.filteredPatients.filter(
      (p) => p.patientKy !== patient.patientKy
    );
    this.openSuccessSnackBar('Patient archived successfully');
  }
}
