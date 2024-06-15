import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app/app.component';
import { Router } from '@angular/router';
import { ChatintComponent } from '../chatint/chatint.component';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports:[CommonModule,FormsModule, AppComponent],
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent{

  constructor(private router: Router) {}

  mainpage = true;
  loginform = false;
  signup = false;

  login = false;

  email='';
  password='';
  email_s='';
  password_s='';
  new_password='';
  
  // loginl = this.login;
  
  showloginform() {
    console.log('in function');
    this.mainpage = false;
    this.loginform = true;
    this.signup = false;
  }

  showsignupform() {
    this.mainpage = false;
    this.signup = true;
    this.loginform = false;
  }

  loginauth() {
    if (!this.email) {
      alert('Please enter your email address.');
      return;
    }
  
    let users = JSON.parse(localStorage.getItem("user_details") || '""');
    if(!users.find((users: { email: string; }) => users.email === this.email)){
      alert('No details found');
      return;
    }
    let foundUser = users.find((users: { email: string; }) => users.email === this.email);
  
    if (foundUser && foundUser.password === this.password) {
      alert('Login successful!');
      this.router.navigate(['/chat']);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  } 

  signupauth() {
    if (this.email_s === null) {
      alert('Please enter your email address.');
      return;
    }  
    if (this.email_s && this.password_s && this.new_password) {
      if (this.password_s !== this.new_password) {
        alert('Incorrect password confirmation.');
        return;
      }
      let users: any[] = []; 
      let existingData = localStorage.getItem("user_details");
      let newUser = { email: this.email_s, password: this.password_s };
      console.log(newUser);
      if (existingData!=null) {
        let parsedData = JSON.parse(existingData);
        parsedData.push(newUser); 
        users = parsedData; 
      } else {
        users.push(newUser);
      }
      existingData = JSON.stringify(users); 

      localStorage.setItem("user_details", existingData);
      // console.log(this.loginl);
      alert('User registered successfully!');
      this.showloginform();
    } else {
      alert('Please fill in both fields.');
    }
  }

  dismiss(){
    this.mainpage = false;
    this.loginform = false;
    this.signup = false;
  }
}
