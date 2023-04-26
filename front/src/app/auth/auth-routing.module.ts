import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InscriptionComponent} from "./components/inscription/inscription.component";
import {ConnectionComponent} from "./components/connection/connection.component";

const routes: Routes = [
  { path: 'connexion', component: ConnectionComponent},
  { path: 'inscription', component: InscriptionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
