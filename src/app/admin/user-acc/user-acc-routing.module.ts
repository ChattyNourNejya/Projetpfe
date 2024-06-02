import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccComponent } from './user-acc.component';




const routes: Routes = [
  {
    path: 'users',
    component: UserAccComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccRoutingModule { }
