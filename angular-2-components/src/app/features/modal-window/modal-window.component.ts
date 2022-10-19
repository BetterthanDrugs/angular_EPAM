import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../courses/courses.model';
import { COURSE_DEFAULT } from './modal-window.model';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent {
  @Input() modalMessage: string = '';
  @Output() closeEvent = new EventEmitter<void>();
  constructor() {}

  closeModalButtonEvent(): void {
    this.closeEvent.emit();
  }
}
