import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private key : string = "123";
  constructor() { }
  public saveData(key: string, value: string) : void {
    localStorage.setItem(key, this.encrypt(value));
  }
  public getData(key: string) : string {
    let data : string = localStorage.getItem(key)|| "";
    return this.decrypt(data);
  }
  public removeData(key: string) : void {
    localStorage.removeItem(key);
  }

  public clearData() : void {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) : string {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
