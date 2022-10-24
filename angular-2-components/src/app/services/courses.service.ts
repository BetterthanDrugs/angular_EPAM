import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Request200, Request400, SearchCourseField } from '../app.model';
import { Course } from '../features/courses/courses.model';


@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Course[]> {
    return this.http
      .get<Request200<Course[]>>('http://localhost:4000/courses/all')
      .pipe(map(response => response.result));
  }

  filterCourse(filter: SearchCourseField): Observable<Course[]> {
    return this.http
      .get<Request200<Course[]>>(
        `http://localhost:4000/courses/filter?${
          filter.title ? `title=${filter.title}` : ''
        }`
      )
      .pipe(map(response => response.result));
  }

  createCourse(course: Course): Observable<Request200<Course> | Request400> {
    return this.http.post<Request200<Course> | Request400>(
      'http://localhost:4000/courses/add',
      course
    );
  }

  editCourse(course: Course): Observable<Request200<Course> | Request400> {
    return this.http.put<Request200<Course> | Request400>(
      'http://localhost:4000/courses/${course.id}',
      course
    );
  }

  deleteCourse(course: Course): Observable<Request400 | {}> {
    return this.http.delete(`http://localhost:4000/courses/${course.id}`);
  }

  getCourse(course: Course): Observable<Request200<Course> | Request400> {
    return this.http.get<Request200<Course> | Request400>(
      `http://localhost:4000/courses/${course.title}`
    );
  }
}
