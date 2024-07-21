import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { UserService } from '../services/userservice';
import { AppComponent } from '../app/app.component';
import { LoginpageComponent } from '../loginpage/loginpage.component';
import { ChatintComponent } from '../chatint/chatint.component';
import { AppRoutingModule } from '../app/app.routes'; // Adjust the path as per your project structure
import { PipesModule } from '../chatint/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    ChatintComponent,
    PipesModule
    // Add other components here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
    // Add other modules here
  ],
  providers: [
    HttpClient
    // Add other services/providers here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
