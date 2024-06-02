import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccRoutingModule } from './user-acc-routing.module';





import { FeatherIconsModule } from '@shared/components/feather-icons/feather-icons.module';
import { SharedModule } from '@shared';

import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from '@shared/components/components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserAccRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ComponentsModule,
    MatIconModule,
    NgxPaginationModule,
    SharedModule,
    FeatherIconsModule,
  ],
})
export class UserAccModule {}
