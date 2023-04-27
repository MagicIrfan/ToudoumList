import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {ServerUtils} from "../utils/serverUtils";
import {LoginResponse} from "../models/loginresponse.model";
import {Observable} from "rxjs";
import {LocalService} from "./local.service";
import jwt_decode from 'jwt-decode';
import {JwtObject} from "../models/jwt.model";
import {Message} from "../models/message.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;

  constructor(private httpClient:HttpClient, private localService:LocalService) {
    this.token = this.localService.getData("token");
    if(this.isConnected()){
      const decodedToken : JwtObject = jwt_decode(this.token);
      const dateToken : Date = new Date(0);
      dateToken.setUTCSeconds(decodedToken.exp);
      const currentDate : Date = new Date();
      if(dateToken <= currentDate){
        this.disconnect()
      }
    }
  }

  login(user : User) : Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${ServerUtils.url}/api/auth/login/`,user);
  }

  signup(user: User) : Observable<Message>{
    return this.httpClient.post<Message>(`${ServerUtils.url}/api/auth/signup/`,user);
  }

  setToken(token:string): void{
    this.token = token;
  }
  getToken(): string {
    return this.token;
  }

  isConnected():boolean{
    return this.token !== undefined && this.token.length > 0;
  }

  disconnect(): void{
    this.localService.removeData("token");
    this.localService.removeData("id");
    this.token = '';
  }
}
