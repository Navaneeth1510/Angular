import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LoginpageComponent } from '../loginpage/loginpage.component';
import { UserService } from '../services/userservice';
import { LoginService } from '../../loginservice';
import { firstValueFrom } from 'rxjs';

interface Message {
  text: string;
  sender: 'user' | 'model';
  timestamp: string;
}

interface Conversation {
  index: number;
  userId: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-chatint',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, LoginpageComponent, HttpClientModule],
  templateUrl: './chatint.component.html',
  styleUrls: ['./chatint.component.css']
})
export class ChatintComponent implements OnInit {

  constructor(private http: HttpClient, private userservice: UserService, private loginservice: LoginService) { }

  inputText: string = '';
  currentConversation: Message[] = [];
  userId: string = '';
  history: Conversation[] = [];

  his_length = 0;

  ngOnInit(): void {
    if (this.loginservice.loginname != '') {
      this.userId = this.loginservice.loginname;
    } else {
      this.userId = this.userservice.userName;
    }
    this.his_length = 0;
    if (this.userId) {
      this.loadHistory();
    } else {
      console.error('User ID is not set');
    }
  }

  sendMessage(): void {
    if (this.inputText.trim()) {
      const message: Message = { text: this.inputText, sender: 'user', timestamp: new Date().toISOString() };
      this.currentConversation.push(message);
      this.modelResponse();
      this.inputText = '';
    }
  }

  // async modelResponse():Promise<void>{
      // const modelText="This is response from modelThis is response from modelThis is response from modelThis is response from modelThis is response from modelThis is response from modelThis is response from modelThis is response from modelThis is response from modelThis is response from model";
      // const message: Message = { text: modelText, sender: 'model', timestamp: new Date().toISOString() };
      // this.currentConversation.push(message);
    // }

      async modelResponse(): Promise<void> {
        try {
          console.log('Sending request to Flask server:', {
            seed: this.inputText,
            n_chars: 100
          });
    
          const response = await fetch('http://127.0.0.1:8000/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ seed: this.inputText, n_chars: 100 }),
          });
    
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}: ${errorText}`);
          }
    
          const data = await response.json();
          console.log('Response from Flask server:', data);

          const botResponse = data.generated_text;
          const message: Message = { text: botResponse, sender: 'model', timestamp: new Date().toISOString() };
          this.currentConversation.push(message);
        } catch (error) {
          console.error('Error:', error);
        }
      }

    //   async modelResponse(): Promise<void> {
    //     try {
    //         const response = await firstValueFrom(this.http.post<{ generated_text: string }>('http://127.0.0.1:8000/generate', {
    //             seed: this.inputText,
    //             n_chars: 100
    //         }));
    
    //         if (response) {
    //             const botResponse = response.generated_text;
    //             const message: Message = { text: botResponse, sender: 'model', timestamp: new Date().toISOString() };
    //             this.currentConversation.push(message);
    //         } else {
    //             console.error('No response from the server');
    //         }
    //     } catch (error: any) {
    //         console.error('Error:', error);
    //         if (error.status === 500) {
    //             console.error('Internal Server Error:', error.error);
    //         } else {
    //             console.error('Network error:', error.message);
    //         }
    //     }
    // }
    
    
      

  saveConversation(): void {
    const timestamp = new Date().toISOString();
    let new_index = 0;
      for(let i = 0;i<this.history.length;i++){
            if(this.history[i].index > new_index){
              new_index = this.history[i].index+1;
            }
      }
    const conversation = {
      index: new_index,
      timestamp: timestamp,
      messages: this.currentConversation
    };
    this.userId = this.userservice.userName;
    if (conversation.messages.length != 0) {
      this.http.post(`http://localhost:5000/conversations/${this.userId}`, conversation)
        .subscribe(response => {
          console.log('Conversation saved:', response);
          this.loadHistory();
        }, error => {
          console.error('Error saving conversation:', error);
        });
    }
  }

  loadHistory(): void {
    this.userId = this.userservice.userName;

    if (!this.userId) {
      console.error('User ID is not set');
      return;
    }

    this.http.get<Conversation[]>(`http://localhost:5000/conversations/${this.userId}`)
      .subscribe(conversations => {
        this.history = conversations;
        let new_index = 0;
      for(let i = 0;i<this.history.length;i++){
            if(this.history[i].index > new_index){
              new_index = this.history[i].index;
            }
      }
      this.his_length = new_index+1;
        console.log('History loaded:', this.history);
      }, error => {
        console.error('Error loading conversation history:', error);
      });
  }

  loadConversation(index: number): void {
    console.log('loadConversation called with index:', index);

    if (index < 0 || index >= this.history.length) {
      console.error('Index out of bounds:', index);
      return;
    }

    if (!this.history[index] || !this.history[index].messages) {
      console.error('Invalid conversation data at index:', index);
      return;
    }

    console.log('Loading conversation:', this.history[index]);

    this.currentConversation = [...this.history[index].messages];

    console.log('Current conversation loaded:', this.currentConversation);
  }

  deleteConversation(index: number): void {
    this.userId = this.userservice.userName;
    const conversationIndex = this.history[index].index;
    this.history.splice(index, 1);
    this.http.delete(`http://localhost:5000/conversations/${this.userId}/${conversationIndex}`)
      .subscribe(response => {
        console.log('Conversation deleted:', response);
      }, error => {
        console.error('Error deleting conversation:', error);
      });
  }

  startNewChat(): void {
    if (this.currentConversation.length > 0) {
      let new_index = 0;
      for(let i = 0;i<this.history.length;i++){
            if(this.history[i].index > new_index){
              new_index = this.history[i].index;
            }
      }
      const newConversation: Conversation = {
        index: this.his_length+1,
        userId: this.userId,
        messages: [...this.currentConversation],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.history.push(newConversation);
      // this.his_length++;
      this.saveConversation();
      this.currentConversation = [];
    }
  }
}
