import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {InscriptionComponent} from "./components/inscription/inscription.component";
import {ConnectionComponent} from "./components/connection/connection.component";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
  declarations: [
    ConnectionComponent,
    InscriptionComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  providers: [],
  exports: [
    ConnectionComponent,
    InscriptionComponent,
  ]
})
export class AuthModule { }
