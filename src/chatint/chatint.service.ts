// chat.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Message {
  text: string;
  sender: 'user' | 'model';
}

export interface Conversation {
  _id?: string;
  messages: Message[];
}

@Injectable({
  providedIn: 'root' // This ensures that the service is a singleton and available throughout the app
})
export class ChatService {
  private apiUrl = 'http://localhost:5000/conversations';

  constructor(private http: HttpClient) {}

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.apiUrl);
  }

  saveConversation(conversation: Conversation): Observable<Conversation> {
    return this.http.post<Conversation>(this.apiUrl, conversation);
  }

  deleteConversation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
