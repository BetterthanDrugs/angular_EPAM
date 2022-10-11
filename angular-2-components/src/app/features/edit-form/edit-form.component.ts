import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../courses/courses.model';
import { COURSE_DEFAULT } from '../modal-window/modal-window.model';
import { FormControl, FormGroup } from '@angular/forms';
import { TEMPLATE_STRINGS } from '../../app.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit {
  @Input() currentObj: Course = COURSE_DEFAULT;
  @Input() buttonSubmitText: String = '';
  @Output() closeEvent = new EventEmitter<void>();
  addEditFormTemplateStrings = TEMPLATE_STRINGS;
  formDataEdit: FormGroup = new FormGroup({
    new_author: new FormControl(''),
    edit_authors: new FormControl(''),
    edit_creationDate: new FormControl(''),
    edit_description: new FormControl(''),
    edit_duration: new FormControl(''),
    edit_title: new FormControl(''),
    edit_id: new FormControl(''),
  });

  ngOnInit() {
    this.formDataEdit.setValue({
      new_author: '',
      edit_authors: this.currentObj.authors,
      edit_creationDate: this.currentObj.creationDate,
      edit_description: this.currentObj.description,
      edit_duration: this.currentObj.duration,
      edit_title: this.currentObj.title,
      edit_id: this.currentObj.id,
    });
  }

  get edit_authors(): any {
    return this.formDataEdit.get('edit_authors');
  }
  get edit_creationDate(): any {
    return this.formDataEdit.get('edit_creationDate');
  }
  get edit_description(): any {
    return this.formDataEdit.get('edit_description');
  }
  get edit_title(): any {
    return this.formDataEdit.get('edit_title');
  }
  get edit_id(): any {
    return this.formDataEdit.get('edit_id');
  }
  get edit_duration(): any {
    return this.formDataEdit.get('edit_duration');
  }

  onSubmit(): void {
    if (this.formDataEdit.valid) {
      console.log('Submit edit form');
      this.closeEvent.emit();
    } else {
      this.formDataEdit.markAllAsTouched();
    }
  }

  closeModalButtonEvent(): void {
    this.closeEvent.emit();
  }
}
