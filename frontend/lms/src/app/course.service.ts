import { Injectable } from '@angular/core';
import { Course } from './courses';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { APIurlCourse } from 'src/assets/config.service';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    })
  };

/*   httpOptions.headers =
  httpOptions.headers.set('Authorization', 'my-new-auth-token'); */

  getCourses() {
    return this.http.get<Course[]>('/assets/courses.json');
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(APIurlCourse, course, {})
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  deleteCourse(id: number): Observable<unknown> {
    const url = `${APIurlCourse}/${id}`;
    return this.http.delete(url, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(APIurlCourse, course, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
