import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Email } from '../entities/email';
import { Phone } from '../entities/phone';
import { Address } from '../entities/address';
import { Patient } from '../entities/patient';
import { PatientService } from '../service/patient.service';
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  showEmailVerticalStepper: boolean = false;
  showPhoneVerticalStepper: boolean = false;
  showAddressVerticalStepper: boolean = false;
  showLastAddressVerticalStepper: boolean = false;
  showLastEmailVerticalStepper: boolean = false;
  showLastPhoneVerticalStepper: boolean = false;

  selectedImageURL: string | null = null;
  selectedImageURLToSave: string | null = null;
  selectedImageFile: File | null = null;
  imageLabel: string = '';

  email1!: FormGroup;
  email2!: FormGroup;
  email3!: FormGroup;

  phone1!: FormGroup;
  phone2!: FormGroup;
  phone3!: FormGroup;

  address1!: FormGroup;
  address2!: FormGroup;
  address3!: FormGroup;

  patient!: Patient;

  addpatientForm!: FormGroup;
  addadressForm!: FormGroup;
  addemailForm!: FormGroup;
  addphoneForm!: FormGroup;

  countries: string[] = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Ivory Coast',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
    'Other',
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,

    private patientService: PatientService,
    private router: Router
  ) {}

  adress: any = {};
  email!: Email;
  phone: any = {};

  ngOnInit(): void {
    localStorage.clear();
    // Check the value of the 'action' property to determine which form to show
    this.addpatientForm = this.fb.group({
      patientLastName: ['', [Validators.required, Validators.minLength(3)]],
      patientFirstName: ['', [Validators.required, Validators.minLength(3)]],
      patientMiddleName: ['', []],
      patientIdentityNumber: ['', [Validators.required]],
      patientIdentityType: ['', [Validators.required]],
      patientBirthDate: ['', [Validators.required]],
      patientGender: ['', [Validators.required]],
      patientMaritalStatus: ['', [Validators.required]],
      patientNationality: ['', [Validators.required]],
      patientDeathDate: [''],
      patientDeathRemarks: [''],
      patientSize: ['', [Validators.pattern('^[0-9]*$')]],
      patientWeight: ['', [Validators.pattern('^[0-9]*$')]],
      patientRemarks: ['', []],
      patientStatus: ['', [Validators.required]],
    });

    this.addadressForm = this.generateAddressFormGroup();
    this.address1 = this.generateAddressFormGroup();
    this.address2 = this.generateAddressFormGroup();
    this.address3 = this.generateAddressFormGroup();

    this.addemailForm = this.generateEmailFormGroup();
    this.email1 = this.generateEmailFormGroup();
    this.email2 = this.generateEmailFormGroup();
    this.email3 = this.generateEmailFormGroup();

    this.addphoneForm = this.generatePhoneFormGroup();
    this.phone1 = this.generatePhoneFormGroup();
    this.phone2 = this.generatePhoneFormGroup();
    this.phone3 = this.generatePhoneFormGroup();
  }
  onClose(): void {
    this.addpatientForm.reset();
    this.addadressForm.reset();
    this.addemailForm.reset();
    this.addphoneForm.reset();
    this.router.navigate([`/patient`]);
  }
  goToPatient() {
    this.router.navigate([`/patients`]);
  }
  // Method to go to the next step
  goToNextStep() {
    this.stepper.next();
  }

  // Method to go to the previous step
  goToPreviousStep() {
    this.stepper.previous();
  }
  generateAddressFormGroup(): FormGroup {
    return this.fb.group({
      addressPrimary: [false, [Validators.required]],
      addressType: ['', [Validators.required]],
      addressValid: ['', [Validators.required]],
      addressStreetNumber: [''],
      addressAvenueLabel: [''],
      addressPostalCode: [''],
      addressApartmentNumber: [''],
      addressBuildingLabel: [''],
      addressResidenceLabel: [''],
      addressDetails: [''],
      addressCity: [''],
      addressCountry: ['', [Validators.required]],
      addressStreetLabel: [''],
    });
  }
  generateEmailFormGroup(): FormGroup {
    return this.fb.group({
      emailPrimary: [false, [Validators.required]],
      emailValue: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }
  generatePhoneFormGroup(): FormGroup {
    return this.fb.group({
      phonePrimary: [false, [Validators.required]],
      phoneCountry: ['', [Validators.required]],
      phoneProfessional: [false],
      phoneNumber: ['', [Validators.required]],
      phoneType: ['', [Validators.required]],
      phoneReceiveSMS: [false],
    });
  }

  add(
    p: Patient,
    phone1: Phone,
    phone2: Phone,
    phone3: Phone,
    address1: Address,
    address2: Address,
    address3: Address,
    email1: Email,
    email2: Email,
    email3: Email
  ) {
    console.log(
      p,
      phone1,
      phone2,
      phone3,
      address1,
      address2,
      address3,
      email1,
      email2,
      email3
    );
    // Ensure addresses, emails, and phones properties are initialized as arrays
    if (!p.addresses) {
      p.addresses = [];
    }
    if (!p.emails) {
      p.emails = [];
    }
    if (!p.phones) {
      p.phones = [];
    }
    if (this.phone1.valid) {
      phone1.phonePrntType = 0;
      p.phones.push(phone1);
    }
    if (this.phone2.valid) {
      phone2.phonePrntType = 0;
      p.phones.push(phone2);
    }
    if (this.phone3.valid) {
      phone3.phonePrntType = 0;
      p.phones.push(phone3);
    }

    if (this.email1.valid) {
      email1.emailPrntType = 0;
      p.emails.push(email1);
    }
    if (this.email2.valid) {
      email2.emailPrntType = 0;
      p.emails.push(email2);
    }
    if (this.email3.valid) {
      email3.emailPrntType = 0;
      p.emails.push(email3);
    }

    if (this.address1.valid) {
      address1.addressPrntType = 0;
      p.addresses.push(address1);
    }
    if (this.address2.valid) {
      address2.addressPrntType = 0;
      p.addresses.push(address2);
    }
    if (this.address3.valid) {
      address3.addressPrntType = 0;
      p.addresses.push(address3);
    }

    const requestPayload = { patient: p };
    console.log(requestPayload);
    this.patientService.createPatient(requestPayload).subscribe(
      (data) => {
        console.log(data);
        if (data['message'] === 'Patient Created') {
          this.openSuccessSnackBar('Patient created successfully');
        } else {
          this.openErrorSnackBar('Error creating patient');
        }
      },
      (error: any) => {
        console.error('Error creating patient:', error);
        this.openErrorSnackBar('Error creating patient');
      }
    );
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

  openEmailVerticalStepperS() {
    this.showEmailVerticalStepper = true;
  }
  closeEmailVerticalStepper() {
    this.showEmailVerticalStepper = false;
  }
  openAddressVerticalStepper() {
    this.showAddressVerticalStepper = true;
  }

  closeAddressVerticalStepper() {
    this.showAddressVerticalStepper = false;
  }

  openVerticalStepperPhone() {
    this.showPhoneVerticalStepper = true;
  }
  closeVerticalStepperPhone() {
    this.showPhoneVerticalStepper = false;
  }

  openLastAddressVerticalStep() {
    this.showLastAddressVerticalStepper = true;
  }

  openLastVerticalStepperPhone() {
    this.showLastPhoneVerticalStepper = true;
  }

  openLastEmailVerticalStepperS() {
    this.showLastEmailVerticalStepper = true;
  }
}
