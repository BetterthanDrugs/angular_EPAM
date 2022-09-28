import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../courses/courses.model';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent {
  @Input() showObj: Course = {
    authors: [],
    creationDate: '',
    description: '',
    duration: 0,
    id: '',
    title: '',
  };
  @Output() closeEvent = new EventEmitter<void>();
  constructor() {}

  closeModalButtonEvent() {
    this.closeEvent.emit();
  }
}
