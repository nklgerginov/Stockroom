import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: false,
  templateUrl: './error-message.html',
  styleUrl: './error-message.css',
})
export class ErrorMessage {
  @Input({ required: true }) message!: string;
  @Input() showRetry = false;
  @Output() retry = new EventEmitter<void>();
}
