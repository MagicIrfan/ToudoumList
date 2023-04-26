import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditTaskComponent} from "./tasks/components/edit-task/edit-task.component";
import {MainPageComponent} from "./core/components/main-page/main-page.component";
import {AddTaskComponent} from "./tasks/components/add-task/add-task.component";
import {FullTaskComponent} from "./tasks/components/full-task/full-task.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'edit-task/:id', component: EditTaskComponent, canActivate:[AuthGuard]},
  { path: 'edit-task', component: AddTaskComponent,canActivate:[AuthGuard]},
  { path: 'task/:id', component: FullTaskComponent,canActivate:[AuthGuard]},
  { path: '', component: MainPageComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
