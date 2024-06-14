import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Stay } from '../entities/stay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StayserviceService } from '../service/stayservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Insurance } from 'app/admin/insurance/insurance';
import { LeService } from '../entities/LeService';
import { Patient } from '../entities/patient';
import { PatientService } from '../service/patient.service';
import { StayRoom } from '../entities/stay-room';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss'],
})
export class AdmissionComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  showServiceVerticalStepper: boolean = false;
  showInsuranceVerticalStepper: boolean = false;
  showLastInsuranceVerticalStepper: boolean = false;
  showLastServiceVerticalStepper: boolean = false;
  selectedServiceId: number;
  stayallForm: any = [];
  Leservice1!: FormGroup;
  Leservice2!: FormGroup;
  Leservice3!: FormGroup;
  insurance1!: FormGroup;
  insurance2!: FormGroup;
  insurance3!: FormGroup;
  stayFormGroup!: FormGroup;
  patientKy: number = 0;

  Stay!: Stay;
  addstayForm!: FormGroup;
  addinsuranceForm!: FormGroup;
  addLeserviceForm!: FormGroup;

  insurances: Insurance[] = [];
  stayPertinentService: any[] = [];
  stayRoomsForService: any[] = [];
  stayrooms: any[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private stayService: StayserviceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService
  ) {
    this.selectedServiceId = 0;
  }

  ngOnInit(): void {
    this.initializeForms();

    this.getInsurances();
    this.getService();

    // Subscribe to service selection changes
    this.addLeserviceForm
      .get('service_Nm')
      ?.valueChanges.subscribe((service) => {
        this.onServiceSelected(service);
      });

    this.activatedRoute.params.subscribe((params) => {
      const patientKy = +params['patientKy'];
      if (!isNaN(patientKy)) {
        this.patientKy = patientKy;
        this.getPatient(patientKy);
      } else {
        console.error('Invalid patient ID.');
      }
    });
  }

  private initializeForms(): void {
    this.addstayForm = this.fb.group({
      stayStatus: ['', [Validators.required]],
      stayNote: [''],
      stayEmergencyContact: ['', [Validators.required]],
      stayType: [''],
      stayFamilyDoctor: ['', [Validators.required]],
      stayFamilyDoctorEmail: [''],
      stayFamilyDoctorPhone: ['', [Validators.required]],
      stayPrevisionalBegin: ['', [Validators.required]],
      stayPrevisionalEnd: ['', [Validators.required]],
    });

    this.addinsuranceForm = this.generateInsuranceFormGroup();
    this.insurance1 = this.generateInsuranceFormGroup();
    this.insurance2 = this.generateInsuranceFormGroup();
    this.insurance3 = this.generateInsuranceFormGroup();

    this.addLeserviceForm = this.generateLeserviceFormGroup();
    this.Leservice1 = this.generateLeserviceFormGroup();
    
    this.stayFormGroup = this.generatestayFormGroup();
  }

  getPatient(patientKy: number): void {
    this.patientService.getPatientById(patientKy).subscribe(
      (patient: Patient) => {
        console.log('Patient information:', patient);
      },
      (error: any) => {
        console.error('Error retrieving patient information:', error);
      }
    );
  }

  onClose(): void {
    this.addstayForm.reset();
    this.addinsuranceForm.reset();
    this.addLeserviceForm.reset();
    this.router.navigate(['/patient']);
  }

  goToPatient() {
    this.router.navigate(['/patient']);
  }

  goToNextStep() {
    this.stepper.next();
  }

  goToPreviousStep() {
    this.stepper.previous();
  }

  generateInsuranceFormGroup(): FormGroup {
    return this.fb.group({
      insNm: ['', [Validators.required]],
    });
  }

  generateLeserviceFormGroup(): FormGroup {
    return this.fb.group({
      service_Nm: ['', [Validators.required]],
    });
  }

  generatestayFormGroup(): FormGroup {
  return this.fb.group({
     stayRoom_Nm: ['', [Validators.required]],
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

  openInsuranceVerticalStepperS() {
    this.showInsuranceVerticalStepper = true;
  }

  closeInsuranceVerticalStepper() {
    this.showInsuranceVerticalStepper = false;
  }

  openServiceVerticalStepper() {
    this.showServiceVerticalStepper = true;
  }

  closeServiceVerticalStepper() {
    this.showServiceVerticalStepper = false;
  }

  openLastInsuranceVerticalStep() {
    this.showLastInsuranceVerticalStepper = true;
  }

  openLastServiceVerticalStepperS() {
    this.showLastServiceVerticalStepper = true;
  }

  addStay(
    patientKy: number,
    stayDetails: any,
    insuranceDetails: any[],
    serviceDetails: any[],
    roomDetails: any[]
  ): void {
 const payload = {
   insurances: insuranceDetails.map((insurance: any) => ({
     insKy: insurance.insKy,
     insNm: insurance.insNm,
     insNumber: insurance.insNumber,
     policyNum: insurance.policyNum,
     policyNm: insurance.policyNm,
     website: insurance.website,
     policyType: insurance.policyType,
     insContactNm: insurance.insContactNm,
     insContactEml: insurance.insContactEml,
     insContactPhone: insurance.insContactPhone,
     insuranceUnxTmCrt: insurance.insuranceUnxTmCrt,
     insuranceUnxTmUpdt: insurance.insuranceUnxTmUpdt,
     insuranceRcrdSts: insurance.insuranceRcrdSts,
   })),
   stay_pertinent_service: serviceDetails.map((service: any) => ({
     service_ky: service.service_ky,
     service_Nm: service.service_Nm,

     stayRooms: service.stayRooms || [],

     stayRoomNm: service.stayRooms.stayRoomNm || [],
   })),
   stay_emergency_contact: stayDetails.stayEmergencyContact,
   stay_type: stayDetails.stayType,
   stay_family_doctor: stayDetails.stayFamilyDoctor,
   stay_family_doctor_email: stayDetails.stayFamilyDoctorEmail,
   stay_family_doctor_phone: stayDetails.stayFamilyDoctorPhone,
   stay_previsional_begin: stayDetails.stayPrevisionalBegin,
   stay_previsional_end: stayDetails.stayPrevisionalEnd,
   stay_status: stayDetails.stayStatus,
   stay_note: stayDetails.stayNote,
 };

    console.log('Payload:', JSON.stringify(payload, null, 2)); // Log the payload

    this.stayService.createStay(patientKy, payload).subscribe(
      (data) => {
        this.openSuccessSnackBar('Stay created successfully');
        console.log(data);
      },
      (error: any) => {
        console.log('Error creating stay', error);
        this.openErrorSnackBar('Error creating stay');
        // Handle error status codes
      }
    );
  }

  add(patientKy: number) {
    const stayDetails = this.addstayForm.value;
    const insuranceDetails = [
      this.insurance1.value,
      this.insurance2.value,
      this.insurance3.value,
    ].filter((ins) => ins); 

    const serviceDetails = [this.Leservice1.value];

    const roomDetails = this.stayFormGroup.value.stayRooms || []; // Ensure stayRooms are included in the roomDetails array

    this.addStay(
      patientKy,
      stayDetails,
      insuranceDetails,
      serviceDetails,
      roomDetails
    );
  }

  onRoomSelected(selectedRoom: any) {
    this.stayFormGroup.patchValue({
      stayRoomNm: selectedRoom.stayRoomNm,
    });
  }

  getInsurances() {
    this.stayService.getAllInsurances().subscribe(
      (data: Insurance[]) => {
        this.insurances = data;
      },
      (error: any) => {
        console.error('Error retrieving insurances:', error);
        this.openErrorSnackBar('Error retrieving insurances');
      }
    );
  }

  getService() {
    this.stayService.getAllServices().subscribe(
      (data: LeService[]) => {
        this.stayPertinentService = data;
      },
      (error: any) => {
        console.error('Error retrieving services:', error);
        this.openErrorSnackBar('Error retrieving services');
      }
    );
  }

  getStayRoomsForService(serviceId: number): void {
    this.stayService.getStayRoomsForService(serviceId).subscribe(
      (data: StayRoom[]) => {
        this.stayRoomsForService = data;
      },
      (error: any) => {
        console.error('Error retrieving stay rooms:', error);
        this.openErrorSnackBar('Error retrieving stay rooms');
      }
    );
  }

  onServiceSelected(selectedService: any): void {
    if (selectedService && selectedService.service_ky) {
      this.selectedServiceId = selectedService.service_ky;
      console.log('Selected service ID:', this.selectedServiceId);
      this.getStayRoomsForService(this.selectedServiceId);
    } else {
      console.error('Invalid service selected:', selectedService);
    }
  }

  onNext1() {
    if (this.selectedServiceId) {
      this.getStayRoomsForService(this.selectedServiceId);
    }
  }
}
