import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app/app.component';
import { Router } from '@angular/router';
import { UserService } from '../services/userservice';
import { LoginService } from '../../loginservice';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

interface User {
  name: string;
  password: string;
  conversations: []; 
}

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports:[CommonModule,FormsModule,HttpClientModule],
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  constructor(private router: Router, private http: HttpClient, private userservice: UserService, private loginservice:LoginService) {}

  mainpage = true;
  loginform = false;
  signup = false;
  login = false;

  email = '';
  password = '';
  email_s = '';
  password_s = '';
  new_password = '';

  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

//password eye part
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

//forms togolling
  showloginform() {
    this.mainpage = false;
    this.loginform = true;
    this.signup = false;
  }
  showsignupform() {
    this.mainpage = false;
    this.signup = true;
    this.loginform = false;
  }


//login part
  loginsuccess(name:string){
    this.userservice.setUserName(name);
  }
  loginauth() {
    if (!this.email || !this.password) {
      alert('Please enter both email and password.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const user = {
      name: this.email,
      password: this.password
    };

    this.http.post('http://localhost:5000/authenticate', user, { headers })
    .subscribe(
      (response: any) => {
        console.log('User login successful:', response);
        console.log(this.email);
        this.userservice.userName = this.email;
        this.loginservice.loginname = this.email;
        console.log("the name is:" + this.userservice.userName);
        alert('User login successful!');
        this.userservice.display();
        this.email = ''; 
        this.password = ''; 
        this.router.navigate(['/chat']); 
      },
      (error) => {
        if (error.status === 401) {
          alert('Invalid email or password. Please try again.');
        } else {
          alert('There was an error logging the user in.' + error);
        }
      }
    );
}



//signup part
  signupauth() {
    if (!this.email_s || !this.password_s || !this.new_password) {
      alert('Please fill in all fields.');
      return;
    }

    if (this.password_s !== this.new_password) {
      alert('Passwords do not match.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const newUser: User = {
      name: this.email_s,
      password: this.password_s,
      conversations: [] 
    };

    this.http.post('http://localhost:5000/insert', newUser, { headers })
      .subscribe(
        (response: any) => {
          console.log('User registered successfully:', response);
          alert('User registered successfully!');
          this.email_s = ''; 
          this.password_s = ''; 
          this.new_password = ''; 
          this.showloginform();
        },
        (error) => {
          console.error('Error registering user:', error);
          alert('There was an error registering the user.');
        }
      );
  }
}