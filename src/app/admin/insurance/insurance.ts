export interface Insurance {
    insKy: number;
    insNm: string ;
    insNumber: string;
    policyNum: string ;
    policyNm: string ;
    policyType: string ;
    website: string ;
    insContactNm: string ;
    insContactPhone :string;
    insContactEml: string ;
    insuranceRcrdSts: number;
    insuranceUnxTmCrt: Date; // Ajoutez cette ligne
   insuranceUnxTmUpdt: Date;
}
