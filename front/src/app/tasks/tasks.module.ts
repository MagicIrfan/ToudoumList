import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskComponent } from './components/task/task.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import {RouterLink} from "@angular/router";
import { AddTaskComponent } from './components/add-task/add-task.component';
import { FullTaskComponent } from './components/full-task/full-task.component';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent,
    TodoCardComponent,
    EditTaskComponent,
    AddTaskComponent,
    FullTaskComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink
    ],
  exports:[
    TaskListComponent,
    TaskComponent,
    TodoCardComponent
  ]
})
export class TasksModule { }
