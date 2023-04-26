import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {TaskService} from "../../../core/services/task.service";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent {

  constructor(private router:Router, private formBuilder: FormBuilder, private taskService:TaskService, private route:ActivatedRoute) {}
  onCreateTask() {
    this.router.navigateByUrl('edit-task');
  }
}
