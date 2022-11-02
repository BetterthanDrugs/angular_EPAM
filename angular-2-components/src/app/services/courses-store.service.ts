import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  finalize,
  map,
  Observable,
  tap,
} from 'rxjs';
import {
  Author,
  Request200,
  Request400,
  SearchCourseField,
} from '../app.model';
import { AuthorsService } from './authors.service';
import { Course } from '../features/courses/courses.model';

import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private courses$$ = new BehaviorSubject<Course[]>([]);
  readonly courses$: Observable<Course[]> = this.courses$$.asObservable();

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  readonly isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  constructor(
    private coursesService: CoursesService,
    private authorService: AuthorsService
  ) {}

  getAll(): Observable<Course[]> {
    this.isLoading$$.next(true);
    return combineLatest([
      this.coursesService.getAll(),
      this.authorService.getAll(),
    ]).pipe(
      map(([courses, authors]) =>
        CoursesStoreService.getAuthorsNamesById(courses, authors)
      ),
      finalize(() => this.isLoading$$.next(false)),
      tap(courses => this.courses$$.next(courses))
    );
  }

  static getAuthorsNamesById(courses: Course[], authors: Author[]): Course[] {
    const authorsMap = new Map(
      authors.map(({ id, name }) => {
        return [id, name];
      })
    );

    return courses.map(course => {
      const authors = course.authors.map(id => authorsMap.get(id) || '');
      return { ...course, authors: authors };
    });
  }

  createCourse(course: Course): Observable<Request200<Course> | Request400> {
    return this.coursesService.createCourse(course);
  }

  editCourse(course: Course): Observable<Request200<Course> | Request400> {
    return this.coursesService.editCourse(course);
  }

  filterCourse(filter: string): Observable<Course[]> {
    this.isLoading$$.next(true);
    return combineLatest([
      this.coursesService.filterCourse(filter),
      this.authorService.getAll(),
    ]).pipe(
      map(([courses, authors]) =>
        CoursesStoreService.getAuthorsNamesById(courses, authors)
      ),
      finalize(() => this.isLoading$$.next(false)),
      tap(courses => {
        this.courses$$.next(courses);
      })
    );
  }

  deleteCourse(course: Course): Observable<Request400 | {}> {
    return this.coursesService.deleteCourse(course);
  }
}
