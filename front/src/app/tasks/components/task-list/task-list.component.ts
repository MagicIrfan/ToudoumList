import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from "../../../core/services/task.service";
import {Task} from "../../../core/models/task.model";
import {LocalService} from "../../../core/services/local.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  public tasks!: Task[];
  @Input() finished!: boolean;
  constructor(private taskService : TaskService,
              private localService: LocalService) {}
  ngOnInit(): void {
    const userId : number = +this.localService.getData("id");
    this.tasks = this.taskService.getTasksByUserId(userId);
  }
}
