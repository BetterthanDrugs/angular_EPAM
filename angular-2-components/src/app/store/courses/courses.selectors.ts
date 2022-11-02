import { createFeatureSelector, createSelector } from '@ngrx/store';

import { coursesFeatureKey, CoursesState } from './courses.reducer';

export namespace CoursesSelectors {
  const selectCourses = createFeatureSelector<CoursesState>(coursesFeatureKey);

  export const selectAllCourses = createSelector(selectCourses, (state: CoursesState) => state.courses);
  export const selectCourse = createSelector(selectCourses, (state: CoursesState) => state.course);
  export const selectErrorMessage = createSelector(selectCourses, (state: CoursesState) => state.errorMessage);
}
