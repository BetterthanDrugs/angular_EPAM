import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/features/courses/courses.model';

export namespace CoursesActions {
  export const requestGetCourses = createAction('Courses$: request get courses');
  export const requestGetCoursesSuccess = createAction('Courses$: request get courses success', props<{ courses: Course[] }>());
  export const requestGetCoursesError = createAction('Courses$: request get courses error');


  export const requestGetCourse = createAction('Courses$: request get course', props<{ id: string }>());


  export const requestGetFilteredCourses = createAction('Courses$: request get filtered courses', props<{ searchValue: string }>());
  export const requestGetFilteredCoursesSuccess = createAction(
    'Courses$: request get filtered courses success',
    props<{ courses: Course[] }>()
  );
  export const requestGetFilteredCoursesError = createAction('Courses$: request get filtered courses error');


  export const requestCreateCourse = createAction('Courses$: request create course', props<{ course: Course }>());
  export const requestCreateCourseSuccess = createAction('Courses$: request create course success');
  export const requestCreateCourseError = createAction('Courses$: request create course error');


  export const requestEditCourse = createAction('Courses$: request edit course', props<{ course: Course }>());
  export const requestEditCourseSuccess = createAction('Courses$: request edit course success');
  export const requestEditCourseError = createAction('Courses$: request edit course error');


  export const requestDeleteCourse = createAction('Courses$: request delete course', props<{ course: Course }>());
  export const requestDeleteCourseSuccess = createAction('Courses$: request delete course success');
  export const requestDeleteCourseError = createAction('Courses$: request delete course error');
}
