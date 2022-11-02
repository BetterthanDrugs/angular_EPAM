import { Action, createReducer, on } from '@ngrx/store';
import { Course } from 'src/app/features/courses/courses.model';

import { CoursesActions } from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  courses: Course[];
  course: Course | null;
  errorMessage: string;
}

export const initialState: CoursesState = {
  courses: [],
  course: null,
  errorMessage: '',
};

const reducer = createReducer(
  initialState,
  on(CoursesActions.requestGetCourses, (state): CoursesState => ({ ...state })),
  on(
    CoursesActions.requestGetCoursesSuccess,
    (state, { courses }): CoursesState => ({ ...state, courses: courses })
  ),
  on(CoursesActions.requestGetCoursesError, (state): CoursesState => ({ ...state })),

  on(CoursesActions.requestGetFilteredCourses, (state): CoursesState => ({ ...state })),
  on(
    CoursesActions.requestGetFilteredCoursesSuccess,
    (state, { courses }): CoursesState => ({ ...state, courses: courses })
  ),
  on(CoursesActions.requestGetFilteredCoursesError, (state): CoursesState => ({ ...state })),

  on(CoursesActions.requestCreateCourse, (state): CoursesState => ({ ...state })),
  on(CoursesActions.requestCreateCourseSuccess, (state): CoursesState => ({ ...state })),
  on(CoursesActions.requestCreateCourseError, (state): CoursesState => ({ ...state })),

  on(CoursesActions.requestEditCourse, (state): CoursesState => ({ ...state })),
  on(CoursesActions.requestEditCourseSuccess, (state): CoursesState => ({ ...state })),
  on(CoursesActions.requestEditCourseError, (state): CoursesState => ({ ...state })),

  on(CoursesActions.requestDeleteCourse, (state): CoursesState => ({ ...state })),
  on(CoursesActions.requestDeleteCourseSuccess, (state): CoursesState => ({ ...state })),
  on(CoursesActions.requestDeleteCourseError, (state): CoursesState => ({ ...state }))
);

export const coursesReducer = (state: CoursesState | undefined, action: Action): CoursesState => reducer(state, action);
