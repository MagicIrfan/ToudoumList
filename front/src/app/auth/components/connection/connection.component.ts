import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UsersService} from "../../../core/services/user.service";
import {AuthService} from "../../../core/services/auth.service";
import {LocalService} from "../../../core/services/local.service";
import {User} from "../../../core/models/user.model";
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
      console.log(formValue);
      console.log(this.userService.getAllUsers());
      if(this.userService.isUserExists(email,password)){
        this.authService.login();
        const user: User = this.userService.getUserByEmailAndPassword(email,password);
        this.localService.saveData("id",user.id.toString());
        this.router.navigateByUrl("/");
      }
      else{
        this.errors = "Email ou mot de passe incorrect !";
        this.router.navigateByUrl("/auth/connexion");
      }

  }
}
