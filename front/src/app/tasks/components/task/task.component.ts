import {Component, Input} from '@angular/core';
import {Task} from "../../../core/models/task.model";
import {TaskService} from "../../../core/services/task.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {bootstrapApplication} from "@angular/platform-browser";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: Task;

  constructor(private taskService: TaskService,private router : Router) {}
  onDeleteTask(taskId:number) : void {
    this.taskService.deleteTask(taskId);
  }
  onEditTask(taskId:number) : void {
    this.router.navigateByUrl(`edit-task/${taskId}`);
  }

  onSeeTask(taskId: number) {
    this.router.navigateByUrl(`task/${taskId}`);
  }

  onCheckTask(id: number,checkInput: HTMLElement) {
    const isFinished: boolean = (<HTMLInputElement>checkInput).checked;
    setTimeout(() : void => {
      this.taskService.setFinishTask(id, isFinished);
    },1000);
  }
}
