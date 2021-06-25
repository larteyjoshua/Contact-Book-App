import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddcontactComponent } from './components/addcontact/addcontact.component';
import { ListcontactsComponent } from './components/listcontacts/listcontacts.component';

const routes: Routes = [ { path: 'listcontacts', component: ListcontactsComponent },
{ path: 'addContact', component: AddcontactComponent },
{ path: '',   redirectTo: '/listcontacts', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
