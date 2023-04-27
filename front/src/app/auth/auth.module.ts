import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {InscriptionComponent} from "./components/inscription/inscription.component";
import {ConnectionComponent} from "./components/connection/connection.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    ConnectionComponent,
    InscriptionComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
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
