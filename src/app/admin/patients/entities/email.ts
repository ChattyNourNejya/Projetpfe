import { EmailPrntType } from "./email-prnt-type";

export interface Email{
    emailKy:number;
    emailPrntType:EmailPrntType;
    emailPrimary:boolean;
    emailValue:string;
    
}