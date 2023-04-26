import { Component } from '@angular/core';
import {Task} from "../../../core/models/task.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../../core/services/task.service";

@Component({
  selector: 'app-full-task',
  templateUrl: './full-task.component.html',
  styleUrls: ['./full-task.component.scss']
})
export class FullTaskComponent {
  task!: Task;
  constructor(private router:Router, private formBuilder: FormBuilder, private taskService:TaskService, private route:ActivatedRoute) {}
  ngOnInit():void {
    const id: number = +this.route.snapshot.params['id'];
    this.task = this.taskService.getTaskById(id);
  }

  onEditTask(id: number) :void {
    this.router.navigateByUrl(`edit-task/${id}`);
  }

  onDeleteTask(id: number) :void {
    this.taskService.deleteTask(id);
    this.onReturn();
  }

  onFinishTask(id: number) : void {
    this.taskService.setFinishTask(id, true);
    this.onReturn();
  }

  onReturn() : void {
    this.router.navigateByUrl('');
  }
}
