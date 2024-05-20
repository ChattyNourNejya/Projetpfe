import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherIconsModule } from '@shared/components/feather-icons/feather-icons.module';
import { SharedModule } from '@shared';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceComponent } from './insurance.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from '@shared/components/components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { DeleteComponent } from './delete/delete.component';



@NgModule({
  declarations: [
    InsuranceComponent,
    FormDialogComponent,
     DeleteComponent,
    
    
  ],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    ComponentsModule,
    MatIconModule,
    NgxPaginationModule,
    SharedModule,
    FeatherIconsModule
    
    
    

    

    
    
    
  ]
})
export class InsuranceModule { }
