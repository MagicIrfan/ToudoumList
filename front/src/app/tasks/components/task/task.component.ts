import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../../core/models/task.model";
import {TaskService} from "../../../core/services/task.service";
import {Router} from "@angular/router";
import {Message} from "../../../core/models/message.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() taskUpdated: EventEmitter<Message> = new EventEmitter<Message>();
  constructor(private taskService: TaskService,private router : Router) {}
  onDeleteTask(taskId:number) : void {
    this.taskService.deleteTask(taskId).subscribe(
      (message:Message) : void => {
        this.taskUpdated.emit(message);
      },
      (error : HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  onEditTask(taskId:number) : void {
    this.router.navigateByUrl(`edit-task/${taskId}`);
  }

  onSeeTask(taskId: number) {
    this.router.navigateByUrl(`task/${taskId}`);
  }

  onCheckTask(task : Task,checkInput: HTMLElement) {
    const isFinished: boolean = (<HTMLInputElement>checkInput).checked;
    setTimeout(() : void => {
      this.taskService.setFinishTask(task, isFinished).subscribe(
        (message:Message) : void => {
          this.taskUpdated.emit(message);
        },
        (error : HttpErrorResponse) => {
          console.log(error);
        }
      );
    },1000);
  }
}
