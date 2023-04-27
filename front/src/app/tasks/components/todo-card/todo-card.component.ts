import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {TaskService} from "../../../core/services/task.service";
import {Task} from "../../../core/models/task.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Message} from "../../../core/models/message.model";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent {

  public tasksFinished!:Task[];
  public tasksUnfinished!:Task[];
  constructor(private router:Router, private formBuilder: FormBuilder, private taskService:TaskService, private route:ActivatedRoute) {
    this.refreshTasks();
  }
  onCreateTask() {
    this.router.navigateByUrl('edit-task');
  }

  refreshTasks() : void{
    this.taskService.getAllTasks(true).subscribe((tasks : Task[]): void =>
      {
        this.tasksFinished= tasks;
      },
      (error : HttpErrorResponse) =>
      {
        console.log(error);
      });
    this.taskService.getAllTasks(false).subscribe((tasks : Task[]): void =>
      {
        this.tasksUnfinished= tasks;
      },
      (error : HttpErrorResponse) =>
      {
        console.log(error);
      });
  }

  onTaskUpdated(message : Message) : void {
    if(message.response === "OK"){
      this.refreshTasks();
    }
  }
}
