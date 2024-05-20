import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Insurance } from '../../insurance';
import { InsuranceService } from '../../insurance.service';

export interface DialogData {
  id: number;
  action: string;
  insurance?: Insurance; // Add the insurance property here
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  insuranceForm!: FormGroup;
  dialogTitle?: string;
 insurance: Insurance = {} as Insurance; // Initialize as an empty insurance object
 isLoading: boolean = false;
 @Input('data') Insurances: Insurance[] = [];
 action?: string ;
 filteredInsurances: Insurance[] = [];
 showSuccessAlert: boolean = false; // Variable pour contrôler l'affichage de l'alerte de succès
 showErrorAlert : boolean = false; 



 constructor(
   private formBuilder: FormBuilder,
   private insurancesService: InsuranceService,
   public dialogRef: MatDialogRef<FormDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public dialogData: DialogData
 ) {}

 ngOnInit(): void {
   this.initForm();
   this.action = this.dialogData.action; // Récupérez l'action à partir des données de la fenêtre de dialogue

   if (this.dialogData && this.dialogData.insurance) {
     this.insurance = this.dialogData.insurance;
     this.populateForm(this.insurance);
   }
 }

 populateForm(insurance: Insurance) {
   this.insuranceForm.patchValue({
     insNm: insurance.insNm,
     insNumber: insurance.insNumber,
     policyNm: insurance.policyNm,
     policyNum: insurance.policyNum,
     policyType: insurance.policyType,
     website: insurance.website,
     insContactNm: insurance.insContactNm,
     insContactPhone: insurance.insContactPhone,
     insContactEml: insurance.insContactEml,
   });
 }

 initForm() {
   this.insuranceForm = this.formBuilder.group({
     insNm: ['', Validators.required],
     insNumber: ['', Validators.required],
     policyNm: ['', Validators.required],
     policyNum: ['', Validators.required],
     policyType: ['', Validators.required],
     website: [''],
     insContactNm: ['', Validators.required],
     insContactPhone: ['', Validators.required],
     insContactEml: ['', [Validators.required, Validators.email]],
   });
 }

 onSubmit() {
   if (this.insuranceForm.valid) {
     if (this.action === 'edit') {
       this.updateInsurance(); // Appeler la méthode d'édition
     } else if (this.action === 'add') {
       this.confirmAdd(); // Appeler la méthode d'ajout
     }
   }
 }

 updateInsurance() {
   // Mettre à jour les données d'assurance existantes ici
   const updatedInsuranceData: Insurance = this.insuranceForm.value;
   updatedInsuranceData.insuranceRcrdSts = 1;
   // Assurez-vous que insuranceUnxTmCrt et insuranceUnxTmUpdt ont des valeurs par défaut
   if (!updatedInsuranceData.insuranceUnxTmCrt) {
     updatedInsuranceData.insuranceUnxTmCrt = new Date();
   }
   if (!updatedInsuranceData.insuranceUnxTmUpdt) {
     updatedInsuranceData.insuranceUnxTmUpdt = new Date();
   }
   // Mettez à jour l'assurance en appelant le service
   this.insurancesService.updateInsurance(this.insurance.insKy, updatedInsuranceData).subscribe(
     (updatedInsurance: Insurance) => {
       console.log('Assurance mise à jour :', updatedInsurance);
       this.dialogRef.close(1);
       this.fetchData();
     },
     error => {
       console.error('Erreur lors de la mise à jour de l\'assurance :', error);
       // Gérez l'erreur ici
     }
   );
 }

 confirmAdd() {
   if (this.insuranceForm.valid) {

     const newInsurance: Insurance = this.insuranceForm.value;
     newInsurance.insuranceRcrdSts = 1;
     console.log('New insurance to add:', newInsurance);
     newInsurance.insKy = Math.floor(Math.random() * 1000);
     newInsurance.insuranceRcrdSts = 1;
     this.insurancesService.createInsurance(newInsurance).subscribe(
       (createdInsurance: Insurance) => {
         console.log('New insurance added:', createdInsurance);
         this.showSuccessAlert = true; // Afficher l'alerte de succès après l'ajout réussi
         setTimeout(() => {
           this.showSuccessAlert = false; // Masquer l'alerte après quelques secondes
         }, 5000); // Durée en millisecondes avant de masquer l'alerte (par exemple, 5 secondes ici)
         this.dialogRef.close(1);
         this.fetchData();
       },
       (error: any) => {
         console.error('Error adding insurance:', error);
         this.showErrorAlert = true; // Afficher l'alerte d'erreur lorsque l'ajout échoue
       }
     );
   } else {
     console.log('Invalid form. Please check the fields.');
   }
 }

 fetchData(): void {
   this.isLoading = true;

   this.insurancesService.getAllInsurances().subscribe(
     (data: Insurance[]) => {
       this.Insurances = data;
       this.filteredInsurances = data;
       this.isLoading = false;
     },
     (error: any) => {
       console.error('Error fetching data:', error);
       this.isLoading = false;
     }
   );
 }

 refresh() {
   this.fetchData();
 }

 closeDialog(): void {
   this.dialogRef.close();
 }

 onNoClick(): void {
   this.dialogRef.close();
 }
}
