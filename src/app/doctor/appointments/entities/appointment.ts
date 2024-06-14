// Define the types (could be in a separate file)
interface Appointment {
  MedVisitSchdld_Ky: number;
  MedVisitSchdld_PatientKy: {
    patientKy: number;
    patientLastName: string;
    patientFirstName: string;
  };
  MedVisitSchdld_MedActKy: any; // Define appropriately based on your data structure
  MedVisitSchld_UnxTmBgn: Date;
  MedVisitSchdld_UnxTmEnd: Date;
  MedVisitSchdld_Status: string; // or enum
}


