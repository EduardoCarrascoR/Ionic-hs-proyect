import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Guard } from '../models/guard.interface';
import { Incident } from '../models/incident.interface';
import { Shift } from '../models/shift.interface';
import { Visitor } from '../models/visitor.interface';

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

  register(data: Incident): Observable<Incident> {
    return this.http.post<Incident>(this.apiUrl + '/news', data);
  }

  getGuardShift(id: number): Observable<Shift[]> {
    return this.http.get<Shift[]>(this.apiUrl + '/shifts/guardShifts/' + id);
  }
  
  registerVisitor(data:Visitor): Observable<Visitor>{
    return this.http.post<Visitor>(this.apiUrl + '/visitors', data);
  }

  getVisitors() {
    console.log('hola')
    /* return this.http.get<Visitors[]>(this.apiUrl + '/visitors'); */
    return of ({
      success: true,
      menssage: 'funciona',
      visitors: [
        { id: 1,
          firstname: 'Eduardo ',         
          lastname:'Carra',
          Rut: '8.888.888-2',
          Patente: 'GKSB78',
        },
        {
          id: 2,
          firstname: 'Eduardo ',
          lastname:'Muñoz',
          Rut: '7.777.777-2',
          Patente: 'GKSB78',
        },
        {
          id: 3,
          firstname: 'Eduardo ',
          lastname:'Cabrera',
          Rut: '5.555.555-2',
          Patente: 'GKSB78',
      
        },
        {
          id: 4,
          firstname: 'Eduardo ',
          lastname:'Aguilar',
          Rut: '6.676.676-2',
          Patente: 'GKSB78',
      
        },
        {
          id: 5,
          firstname: 'Eduardo ',
          lastname:'Muñoz',
          Rut: '7.777.777-2',
          Patente: 'GKSB78',
        }
      ]
    })
  }

  //addIncident(): 
  /*  getAllActivities(course_id: string, unit_number: string, lesson_number: string): Observable<Activity[]> {
      return this.http.get<Activity[]>(`${this.apiUrl}/course/${course_id}/unit/${unit_number}/lesson/${lesson_number}/activities`);
    } */

  /* /shifts​/guardShifts​/{id}
   getTestByCourseId(course_id: string, unit_number: string, lesson_number: string): Observable<Test> {
     return this.http.get<Test>(`${this.apiUrl}/course/${course_id}/unit/${unit_number}/lesson/${lesson_number}/test`);
   } */



}