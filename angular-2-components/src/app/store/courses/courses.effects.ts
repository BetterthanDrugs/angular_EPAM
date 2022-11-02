import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Author } from 'src/app/app.model';
import { Course } from 'src/app/features/courses/courses.model';
import { AuthorsService } from 'src/app/services/authors.service';
import { CoursesService } from 'src/app/services/courses.service';
import { CoursesActions } from './courses.actions';
import { CoursesStateFacade } from './courses.facade';

@Injectable()
export class CoursesEffects {
  getAll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestGetCourses),
      mergeMap(() =>
        combineLatest([this.coursesService.getAll(), this.authorService.getAll()]).pipe(
          map(([courses, authors]) => {
            const CourseWithAuthorName = CoursesEffects.getAuthorsNamesById(courses, authors);
            return CoursesActions.requestGetCoursesSuccess({ courses: CourseWithAuthorName });
          }),
          catchError(() => of(CoursesActions.requestGetCoursesError()))
        )
      )
    );
  });

  filteredCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestGetFilteredCourses),
      mergeMap(({ searchValue }) =>
      // ??
        combineLatest([this.coursesService.filterCourse(searchValue), this.authorService.getAll()]).pipe(
          map(([courses, authors]) => {
            const CourseWithAuthorName = CoursesEffects.getAuthorsNamesById(courses, authors);
            return CoursesActions.requestGetFilteredCoursesSuccess({ courses: CourseWithAuthorName });
          }),
          catchError(() => of(CoursesActions.requestGetFilteredCoursesError()))
        )
      )
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap(({ course }) =>
        this.coursesService.deleteCourse(course).pipe(
          map(() => {
            this.courseStateFacade.getCourses();
            return CoursesActions.requestDeleteCourseSuccess();
          }),
          catchError(() => of(CoursesActions.requestDeleteCourseError()))
        )
      )
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap(({ course }) =>
        this.coursesService.createCourse(course).pipe(
          map(() => CoursesActions.requestCreateCourseSuccess()),

          catchError(() => of(CoursesActions.requestCreateCourseError()))
        )
      )
    );
  });

  editCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap(({ course }) =>
        this.coursesService.editCourse(course).pipe(
          map(() => {
            return CoursesActions.requestEditCourseSuccess();
          }),

          catchError(() => of(CoursesActions.requestEditCourseError()))
        )
      )
    );
  });

  // redirectToTheCoursesPage$ = createEffect();

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private authorService: AuthorsService,
    private courseStateFacade: CoursesStateFacade,
    private router: Router
  ) {}

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
}
