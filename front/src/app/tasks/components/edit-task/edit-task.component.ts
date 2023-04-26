import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable} from "rxjs";
import {Task} from "../../../core/models/task.model";
import { OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../core/services/task.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {

  taskToEdit!: Task;
  editTaskForm!: FormGroup;
  previewTask$!: Observable<Task>;
  nameControl!: FormControl;
  descriptionControl!: FormControl;
  constructor(private router:Router, private formBuilder: FormBuilder, private taskService:TaskService, private route:ActivatedRoute) {}

  ngOnInit():void{
    const id:number = +this.route.snapshot.params['id'];
    this.taskToEdit = this.taskService.getTaskById(id);
    this.nameControl = new FormControl(this.taskToEdit.name, Validators.required);
    this.descriptionControl = new FormControl(this.taskToEdit.description, Validators.required);
    this.editTaskForm = this.formBuilder.group({
      name: this.nameControl,
      description:this.descriptionControl
    }, {
      updateOn: 'change'
    });
    this.previewTask$ = this.editTaskForm.valueChanges.pipe(
      map((task: Task) => ({
        name:task.name,
        userId:0,
        description:task.description,
        id:0,
        finished:false
      })));
  }
  onEditTask():void{
    const formValue = this.editTaskForm!.value;
    this.taskToEdit.name = formValue['name'];
    this.taskToEdit.description = formValue['description'];
    this.taskService.editTask(this.taskToEdit);
    this.router.navigateByUrl("");
  }

  onReturn() : void {
    this.router.navigateByUrl("");
  }
}
