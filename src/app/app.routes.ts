import { RouterModule, Routes } from '@angular/router';
import { ChatintComponent } from '../chatint/chatint.component';
import { NgModule } from '@angular/core';
import { LoginpageComponent } from '../loginpage/loginpage.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: 'Mind-mender', component: LoginpageComponent
    },
    {
        path: 'chat', component: ChatintComponent
    }
];

@NgModule({
    imports: [BrowserModule, FormsModule, CommonModule, RouterModule.forRoot(routes)]
  })
export class AppRoutingModule { }
