import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Course } from '../courses/courses.model';
import { COURSE_DEFAULT } from '../modal-window/modal-window.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ROUTS_LIST, TEMPLATE_STRINGS } from '../../app.model';
import { Router } from '@angular/router';
import { elementAt, ReplaySubject, takeUntil } from 'rxjs';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class EditFormComponent implements OnInit, OnDestroy {
  @Input() currentObj: Course = COURSE_DEFAULT;
  @Input() buttonSubmitText: String = '';
  @Input() isEditForm: boolean = false;
  @Output() closeEvent = new EventEmitter<void>();
  private readonly destroy$ = new ReplaySubject(1);
  addEditFormTemplateStrings = TEMPLATE_STRINGS;
  modalMessage = '';
  showModalAuthorsValidFlag = false;

  authorsTempList: any[] = [];
  authorsList: any[] = [];

  formDataEdit: FormGroup = new FormGroup({
    new_author: new FormControl(''),
    authors: new FormControl('', [Validators.minLength(1)]),
    description: new FormControl(''),
    duration: new FormControl('', [Validators.min(1)]),
    title: new FormControl(''),
    id: new FormControl(''),
  });

  ngOnInit() {
    if (this.authorsTempList.length === 0 && this.currentObj.id !== ''){
      this.authorsTempList = [... this.currentObj.authors];
    }
    this.authorsStateFacade.authors$.pipe(takeUntil(this.destroy$)).subscribe(authors => {
        this.authorsList = authors;
        if (this.authorsList.length === 0) {
          this.authorsStateFacade.getAuthors();
        }
        this.cdr.markForCheck();
        this.formDataEdit.controls['authors'].setValue([]);
        authors.forEach(author => {
          if (this.authorsTempList.includes(author.name)) {
            this.formDataEdit.controls['authors'].setValue([
              ...this.authors.value,
              author.name,
            ]);
          }
        });
      });

    this.formDataEdit.setValue({
      new_author: '',
      authors: this.currentObj.authors,
      description: this.currentObj.description,
      duration: this.currentObj.duration,
      title: this.currentObj.title,
      id: this.currentObj.id,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(() => {});
    this.destroy$.complete();
  }

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authorsStateFacade: AuthorsStateFacade, 
    private courseStateFacade: CoursesStateFacade,
  ) {}

  get new_author(): any {
    return this.formDataEdit.get('new_author');
  }
  get authors(): any {
    return this.formDataEdit.get('authors');
  }
  get description(): any {
    return this.formDataEdit.get('description');
  }
  get title(): any {
    return this.formDataEdit.get('title');
  }
  get id(): any {
    return this.formDataEdit.get('id');
  }
  get duration(): any {
    return this.formDataEdit.get('duration');
  }

  onSubmit(): void {
    if (this.formDataEdit.valid && this.authors.value.length === 0) {
      this.showModalEvent(this.addEditFormTemplateStrings.AUTHOR_MIN);
    }

    if (this.formDataEdit.valid && this.authors.value.length > 0) {
      const { title, description, duration } = this.formDataEdit.value;
      let authorsIdList: string[] = [];

      this.authorsList.forEach(author => {
        if (this.authorsTempList.includes(author.name)) {
          authorsIdList.push(author.id);
        }
      });

      const currentCourse: Course = {
        id: this.currentObj.id ? this.currentObj.id : '',
        title,
        description,
        duration,
        authors: authorsIdList,
      };

      if (this.isEditForm) {
        this.courseStateFacade.editCourse(currentCourse);
      } else {
        this.courseStateFacade.createCourse(currentCourse);
      }
      this.courseStateFacade.getCourses();

      this.router.navigateByUrl(ROUTS_LIST.COURSES_PAGE);
      this.closeEvent.emit();
    } else {
      this.formDataEdit.markAllAsTouched();
    }
  }

  addAuthor(): void {
    let checkValueExisting = this.authorsList.find(element => 
      element.name === this.new_author.value
    );
      if (this.new_author.value) {
        if (!checkValueExisting) {
          this.authorsStateFacade.addAuthor({ name: this.new_author.value });
        }
        this.authorsStateFacade.getAuthors();
        this.authorsTempList = [...this.authorsTempList, this.new_author.value];
        this.formDataEdit.controls['new_author'].setValue('');
    }
  }

  deleteAuthorFromTemplateList(authorName: String): void {
    let tempAuthorsArr = [...this.authors.value];
    const index = tempAuthorsArr.indexOf(authorName);
    if (tempAuthorsArr.indexOf(authorName) > -1) {
      tempAuthorsArr.splice(index, 1);
    }
    this.formDataEdit.controls['authors'].setValue([...tempAuthorsArr]);
  }

  deleteAuthor(authorName: String): void {
    this.authorsStateFacade.authors$.pipe();
    this.authorsList = this.authorsList.filter(author =>
       author.name !== authorName
    );
    this.deleteAuthorFromTemplateList(authorName);
  }

  closeModalButtonEvent(): void {
    this.router.navigateByUrl(ROUTS_LIST.COURSES_PAGE);
    this.closeEvent.emit();
  }

  closeModalMessageEvent(): void {
    this.showModalAuthorsValidFlag = false;
  }

  showModalEvent(message: string): void {
    this.showModalAuthorsValidFlag = true;
    this.modalMessage = message;
  }
}
