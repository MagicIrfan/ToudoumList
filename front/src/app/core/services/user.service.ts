import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {Task} from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users!: User[];

  constructor() {
    this.users = [
      {
        id: 0,
        username:"MagicIrfan",
        email:"bouhenaf.irfan@gmail.com",
        password:"ratio1"
      }
    ]
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User{
    return this.users.find((user : User) : boolean => user.id === id) as User;
  }

  getUserByEmailAndPassword(email:string,password:string): User{
    return this.users.find((user : User) : boolean => user.email == email && user.password === password) as User;
  }

  isUserExists(email:string,password:string) :boolean {
    const user : User | undefined = this.getAllUsers().find((user : User) => user.email === email && user.password === password);
    return user !== undefined;
  }

  isUserExists2(email:string,username:string) :boolean {
    const user : User | undefined = this.getAllUsers().find((user : User) => user.email === email || user.username === username);
    return user !== undefined;
  }

  getLastId():number{
    if (this.users.length === 0) {
      return 0;
    }
    const maxId : number = this.users.reduce((max : number, user :User) => Math.max(max, user.id), 0);
    return maxId + 1;
  }

  addUser(newUser: User):void{
    this.users.push(newUser);
  }
}

