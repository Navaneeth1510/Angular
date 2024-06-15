import { Component, NgModule } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginpageComponent } from '../loginpage/loginpage.component';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { RouterModule, Routes } from '@angular/router';
import '@fortawesome/fontawesome';
import { ChatintComponent } from '../chatint/chatint.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PopoverModule, LoginpageComponent, CommonModule, ChatintComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'amd';
  loggedin = false;
  constructor(private router: Router) {
    this.loggedin = this.router.url === '/chat';
  }
}
