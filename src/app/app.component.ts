import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ng-chat-client';
  message: string;
  name: string;
  feedback: string;
  output: any[] = [];

  constructor(
    private readonly webSocketService: WebSocketService,
  ) {}
  ngOnInit() {
    this.webSocketService.listen('typing').subscribe((data) => this.updateFeedback(data));
    this.webSocketService.listen('chat').subscribe((data) => this.updateMessage(data));
  }

  updateMessage(data: any): void {
    this.feedback = '';
    if (data) {
      this.output.push(data);
    }
  }

  updateFeedback(data: any): void {
    this.feedback = `${data} is typing a message`;
  }

  messageTyping() {
    this.webSocketService.emit('typing', this.name);
  }

  onSend() {
    console.log('Name', this.name, 'message', this.message);
    console.log('Messages', this.output);
    this.webSocketService.emit('chat', {
      message: this.message,
      handle: this.name
    });
    this.message = '';
  }
}
