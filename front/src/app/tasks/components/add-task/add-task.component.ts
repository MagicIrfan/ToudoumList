import { Component } from '@angular/core';
import {Task} from "../../../core/models/task.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../../core/services/task.service";
import {LocalService} from "../../../core/services/local.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Message} from "../../../core/models/message.model";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  editTaskForm!: FormGroup;
  previewTask$!: Observable<Task>;
  nameControl!: FormControl;
  constructor(private router:Router,
              private formBuilder: FormBuilder,
              private taskService:TaskService,
              private route:ActivatedRoute,
              private localService: LocalService) {}

  ngOnInit():void{
    this.nameControl = new FormControl(null, Validators.required);
    this.editTaskForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
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
  onAddTask():void{
    const formValue = this.editTaskForm!.value;
    const userId : number = +this.localService.getData("id");
    const newTask : Task = new Task(
      0,
      userId,
      formValue['name'],
      formValue['description'],
      false,
    );
    this.taskService.addTask(newTask).subscribe(
      (message : Message) : void =>{
        if(message.response === "OK"){
          this.router.navigateByUrl("");
        }
      },
      (error: HttpErrorResponse) : void => {
        console.log(error);
      }
    );
  }

  onReturn() : void {
    this.router.navigateByUrl("");
  }
}
