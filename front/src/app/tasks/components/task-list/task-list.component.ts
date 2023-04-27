import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskService} from "../../../core/services/task.service";
import {Task} from "../../../core/models/task.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Message} from "../../../core/models/message.model";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() tasks!: Task[];
  @Output() taskUpdated: EventEmitter<Message> = new EventEmitter<Message>();
  constructor(private taskService : TaskService) {}
  ngOnInit(): void {}

  onTaskUpdated(message : Message) : void {
    this.taskUpdated.emit(message)
  }
}
