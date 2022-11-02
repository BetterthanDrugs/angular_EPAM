import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BACK_END_SOURCE_URL, Request200, Request400, SearchCourseField } from '../app.model';
import { Course } from '../features/courses/courses.model';


@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Course[]> {
    return this.http
      .get<Request200<Course[]>>(`${BACK_END_SOURCE_URL}/courses/all`)
      .pipe(map(response => response.result));
  }

  filterCourse(filter: string): Observable<Course[]> {
    return this.http
      .get<Request200<Course[]>>(
        `${BACK_END_SOURCE_URL}/courses/filter?${
          filter ? `title=${filter}` : ''
        }`
      )
      .pipe(map(response => response.result));
  }

  createCourse(course: Course): Observable<Request200<Course> | Request400> {
    return this.http.post<Request200<Course> | Request400>(
      `${BACK_END_SOURCE_URL}/courses/add`,
      course
    );
  }

  editCourse(course: Course): Observable<Request200<Course> | Request400> {
    return this.http.put<Request200<Course> | Request400>(
      `${BACK_END_SOURCE_URL}/courses/${course.id}`,
      course
    );
  }

  deleteCourse(course: Course): Observable<Request400 | {}> {
    return this.http.delete(`${BACK_END_SOURCE_URL}/courses/${course.id}`);
  }

  getCourse(course: Course): Observable<Request200<Course> | Request400> {
    return this.http.get<Request200<Course> | Request400>(
      `${BACK_END_SOURCE_URL}/courses/${course.title}`
    );
  }
}
