import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;

  login() {
    this.token = 'MyFakeToken';
  }

  getToken(): string {
    return this.token;
  }

  isConnected():boolean{
    return this.token !== undefined && this.token.length > 0;
  }

  disconnect(): void{
    this.token = '';
  }
}
