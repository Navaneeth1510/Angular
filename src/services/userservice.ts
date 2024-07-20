import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userName: string = '';

  constructor() { }

  setUserName(name: string) {
    console.log('name saved in the service')
    this.userName = name;
    console.log(this.userName);
  }

  getUserName(): string {
    console.log('name being retrieved from service')
    return this.userName;
  }

  display():void{
    alert(this.userName);
  }
}
