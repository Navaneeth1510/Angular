import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LoginpageComponent } from '../loginpage/loginpage.component';

interface Message {
  text: string;
  sender: 'user' | 'model';
}

interface Conversation {
  messages: Message[];
}

@Component({
  selector: 'app-chatint',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent,LoginpageComponent],
  templateUrl: './chatint.component.html',
  styleUrl: './chatint.component.css'
})

export class ChatintComponent implements OnInit {
  inputText: string = '';
  currentConversation: Message[] = [];
  history: Conversation[] = [];

  ngOnInit(): void {
    this.loadHistory();
  }

  sendMessage(): void {
    if (this.inputText.trim()) {
      this.currentConversation.push({ text: this.inputText, sender: 'user' });
      this.modelResponse();
      this.inputText = '';
    }
  }

  modelResponse(): void {
    // Simulate a response from the model
    const modelText = "This is a response from the model.";
    this.currentConversation.push({ text: modelText, sender: 'model' });
  }

  startNewChat(): void {
    if (this.currentConversation.length > 0) {
      this.history.push({ messages: this.currentConversation });
      localStorage.setItem('chatHistory', JSON.stringify(this.history));
      this.currentConversation = [];
    }
  }

  loadHistory(): void {
    const storedHistory = localStorage.getItem('chatHistory');
    if (storedHistory) {
      this.history = JSON.parse(storedHistory);
    }
  }

  loadConversation(index: number): void {
    this.currentConversation = [...this.history[index].messages];
  }

  deleteConversation(index: number): void {
    this.history.splice(index, 1);
    localStorage.setItem('chatHistory', JSON.stringify(this.history));
  }
}