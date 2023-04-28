import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {firstValueFrom, map, Observable} from "rxjs";
import {Task} from "../../../core/models/task.model";
import { OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../core/services/task.service";
import {HttpErrorResponse} from "@angular/common/http";
import { from } from 'rxjs';
import {Message} from "../../../core/models/message.model";

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

  ngOnInit() {
    const id: number = +this.route.snapshot.params['id'];
    if(!id){
      this.router.navigateByUrl("**");
    }
    this.taskService.getTaskById(id).subscribe((task: Task) => {
      this.taskToEdit = task;
      this.nameControl = new FormControl(this.taskToEdit.name, Validators.required);
      this.descriptionControl = new FormControl(this.taskToEdit.description, Validators.required);
      this.editTaskForm = new FormGroup({
        name: this.nameControl,
        description: this.descriptionControl
      }, {
        updateOn: 'change'
      });
      this.previewTask$ = this.editTaskForm.valueChanges.pipe(
        map((task: Task) => ({
          name: task.name,
          userId: 0,
          description: task.description,
          id: 0,
          finished: false
        })));
    }, (error) => {
      console.log('Error fetching task:', error);
    });
  }
  onEditTask():void{
    const formValue = this.editTaskForm!.value;
    this.taskToEdit.name = formValue['name'];
    this.taskToEdit.description = formValue['description'];
    this.taskService.editTask(this.taskToEdit).subscribe(
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
    this.router.navigateByUrl("");
  }
}
