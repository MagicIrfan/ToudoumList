import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import {TasksModule} from "../tasks/tasks.module";
import { NavigationComponent } from './components/navigation/navigation.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    MainPageComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    TasksModule,
    HttpClientModule,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  exports: [
    MainPageComponent,
    NavigationComponent,
  ]
})
export class CoreModule { }
