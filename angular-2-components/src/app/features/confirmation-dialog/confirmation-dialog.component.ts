import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../courses/courses.model';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CoursesStoreService } from '../../services/courses-store.service';
import { COURSE_DEFAULT } from '../modal-window/modal-window.model';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  @Input() showObj: Course = COURSE_DEFAULT;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() confirmationClickEvent = new EventEmitter<void>();
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _courseStoreService: CoursesStoreService
  ) {}

  confirmationModalButtonEvent(): void {
    this.confirmationClickEvent.emit();
  }

  closeModalButtonEvent(): void {
    this.closeEvent.emit();
  }
}
