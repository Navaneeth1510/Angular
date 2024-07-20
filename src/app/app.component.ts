import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports:[
    RouterOutlet
  ],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amd';
  loggedin = false;

  constructor(private router: Router) {
    this.loggedin = this.router.url === '/chat';
  }
}
