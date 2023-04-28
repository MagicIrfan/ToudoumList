import { Component } from '@angular/core';
import {Task} from "../../../core/models/task.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../../core/services/task.service";
import {Message} from "../../../core/models/message.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-full-task',
  templateUrl: './full-task.component.html',
  styleUrls: ['./full-task.component.scss']
})
export class FullTaskComponent {
  task!: Task;
  constructor(private router:Router, private formBuilder: FormBuilder, private taskService:TaskService, private route:ActivatedRoute) {
    const id: number = +this.route.snapshot.params['id'];
    this.taskService.getTaskById(id).subscribe((task : Task) => {
      if(task){
        this.task = task;
      }
      else{
        this.router.navigateByUrl("**");
      }
    });
  }
  ngOnInit():void {}

  onEditTask(id: number) :void {
    this.router.navigateByUrl(`edit-task/${id}`);
  }

  onDeleteTask(id: number) :void {
    this.taskService.deleteTask(id).subscribe(
      (message:Message) : void => {;
        if(message.response === 'OK'){
          this.onReturn();
        }
      },
      (error : HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onFinishTask(task : Task) : void {
    this.taskService.setFinishTask(task, true).subscribe(
      (message:Message) : void => {
          if(message.response === 'OK'){
            this.onReturn();
          }
        },
        (error : HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  onReturn() : void {
    this.router.navigateByUrl('');
  }
}
