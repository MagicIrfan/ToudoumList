import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {UsersService} from "../../../core/services/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../core/models/user.model";

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

  constructor(private authService: AuthService, private userService: UsersService, private router : Router, private formBuilder: FormBuilder) { }

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
    console.log(formValue);
    console.log(this.userService.isUserExists2(email,username));
    if(!this.userService.isUserExists2(email,username)){
      const newUser : User = new User(this.userService.getLastId(),username,email,password);
      this.userService.addUser(newUser);
      console.log(this.userService.getAllUsers());
      this.router.navigateByUrl("/auth/connexion");
    }
    else{
      this.errors = "L'email ou le nom d'utilisateur existe déjà !";
      this.router.navigateByUrl("/auth/inscription");
    }
  }
}
