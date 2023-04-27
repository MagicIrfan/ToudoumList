import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {Task} from "../models/task.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ServerUtils} from "../utils/serverUtils";
import {Message} from "../models/message.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient){}

  getUserByEmailAndPassword(email:string,password:string): Observable<User>{
    const url: string = `${ServerUtils.url}/api/users`;
    const params : {email: string, password:string} = {email: email, password:password};
    return this.httpClient.get<User>(url,{params});
  }
}

