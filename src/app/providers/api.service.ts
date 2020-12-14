import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Guard } from '../models/guard.interface';
import { Incident } from '../models/incident.interface';
import { Shift } from '../models/shift.interface';
import { Visitor } from '../models/visitor.interface';
import { Report } from '../models/report.interface';

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

  registerVisitor(data: Visitor): Observable<Visitor> {
    return this.http.post<Visitor>(this.apiUrl + '/visits', data);
  }

  getVisitors(id: number): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(this.apiUrl + '/visits/allVisit/' + id);
  }

  initShift(id: number, idclient: number): Observable<Shift> {
    return this.http.put<Shift>(this.apiUrl + '/shifts/init/', {id, idclient});
  }

  /* report(data: Report): Observable<Report> {
    console.log(data)
    return this.http.post<Report>(this.apiUrl + '/reports', data);
  } */
  report(dataReport: Report): Observable<Report> {
    /* console.log(dataReport) */
    return this.http.post<Report>(this.apiUrl + '/reports', dataReport);
    
  }

}