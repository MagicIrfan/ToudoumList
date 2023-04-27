import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../core/models/user.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Message} from "../../../core/models/message.model";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  inscriptionForm!: FormGroup;
  emailControl!:FormControl;
  passwordControl!:FormControl;
  usernameControl!:FormControl;
  errors!:string;

  constructor(private authService: AuthService, private router : Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.emailControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]);

    this.usernameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]);

    this.inscriptionForm = this.formBuilder.group({
      email: this.emailControl,
      name: this.usernameControl,
      password: this.passwordControl
    }, {
      updateOn: 'change'
    });
    this.errors = "";
  }

  onCreateUser() :void {
    const formValue = this.inscriptionForm!.value;
    const email : string = formValue['email'];
    const username : string = formValue['name'];
    const password : string = formValue['password'];
    const user : User = new User(
      0,
      username,
      email,
      password
    );
    this.authService.signup(user).subscribe(
      (message: Message) : void =>{
        if(message.response == 'OK'){
          this.router.navigateByUrl("/");
        }
      },
      (errorResponse: HttpErrorResponse) : void => {
        this.errors = errorResponse.error.response;
        this.router.navigateByUrl("/auth/inscription");
      }
    );
  }
}
