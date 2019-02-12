import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './component/user/user-detail/user-detail.component';
import { AddUserComponent } from './component/user/add-user/add-user.component';
import { UpdateUserComponent } from './component/user/update-user/update-user.component';
import { TicketCreationFormComponent } from './component/shared/ticket-creation-form/ticket-creation-form.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: UserDetailComponent },
  { path: 'create', component: AddUserComponent },
  { path: 'update/:id', component: UpdateUserComponent },
  { path: 'ticket', component: TicketCreationFormComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
