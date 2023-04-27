import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InscriptionComponent} from "./components/inscription/inscription.component";
import {ConnectionComponent} from "./components/connection/connection.component";
import {ConnectedGuard} from "../core/guards/connected.guard";

const routes: Routes = [
  { path: 'connexion', component: ConnectionComponent, canActivate:[ConnectedGuard]},
  { path: 'inscription', component: InscriptionComponent, canActivate:[ConnectedGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
