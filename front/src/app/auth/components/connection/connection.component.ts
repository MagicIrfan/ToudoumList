import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UsersService} from "../../../core/services/user.service";
import {AuthService} from "../../../core/services/auth.service";
import {LocalService} from "../../../core/services/local.service";
import {User} from "../../../core/models/user.model";
import {LoginResponse} from "../../../core/models/loginresponse.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Task} from "../../../core/models/task.model";
import {Message} from "../../../core/models/message.model";
@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  connectionForm!: FormGroup;
  emailControl!:FormControl;
  passwordControl!:FormControl;
  errors!: string;
  constructor(private authService: AuthService,
              private userService: UsersService,
              private router : Router,
              private formBuilder: FormBuilder,
              private localService: LocalService) { }

  ngOnInit(): void {
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]);
    this.connectionForm = this.formBuilder.group({
      email: this.emailControl,
      password: this.passwordControl
    }, {
      updateOn: 'change'
    });
    this.errors = "";
  }

  onLogin() : void{
      const formValue = this.connectionForm!.value;
      const email : string = formValue['email'];
      const password : string = formValue['password'];
      this.userService.getUserByEmailAndPassword(email,password).subscribe(
        (user : User) : void => {
          if(user){
            user.password = password;
            this.authService.login(user).subscribe(
              (response : LoginResponse) =>{
                this.authService.setToken(response.token);
                this.localService.saveData("id",response.userId);
                this.localService.saveData("token",response.token);
                console.log(this.localService.getData("id"));
                this.router.navigateByUrl("/");
              },
              (error: HttpErrorResponse): void => {
                this.errors = error.error.response;
                this.router.navigateByUrl("/auth/connexion");
              }
            );
          }
        },
        (errorResponse: HttpErrorResponse) : void => {
          this.errors = errorResponse.error.response;
        });
  }
}
