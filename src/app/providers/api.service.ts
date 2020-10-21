import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guard } from '../models/guard.interface'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private apiUrl = 'http://localhost:3000/api'
  private apiUrl = 'https://highsecurity-app.herokuapp.com/api'
                    
  constructor(
    private http: HttpClient
  ) {

  }

  login(rut: string, password: string): Observable<Guard> {
    return this.http.post<Guard>(this.apiUrl + '/auth/loginApp', { rut, password });
  }

  getGuardById(): Observable<Guard[]> {
    return this.http.get<Guard[]>(this.apiUrl + '/users/Guards');
  }

  //addIncident(): 
/*  getAllActivities(course_id: string, unit_number: string, lesson_number: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/course/${course_id}/unit/${unit_number}/lesson/${lesson_number}/activities`);
  } */

 /*  getTestByCourseId(course_id: string, unit_number: string, lesson_number: string): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/course/${course_id}/unit/${unit_number}/lesson/${lesson_number}/test`);
  } */



}