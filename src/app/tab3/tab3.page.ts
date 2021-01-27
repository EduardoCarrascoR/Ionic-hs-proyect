import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Report } from '../models/report.interface';
import { ApiService } from '../providers/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { Guard } from '../models/guard.interface';
import { Shift } from '../models/shift.interface';
import { Observable } from 'rxjs';
import { Visitor } from '../models/visitor.interface';
import { parseSelectorToR3Selector } from '@angular/compiler/src/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  registerForm: FormGroup
  report: Report
  guard: Guard
  shifts$: Observable<Shift[]>
  shifts: Shift[]
  shift: Shift
  visitas: Visitor[]
  visitas$: Observable<Visitor[]>
  lat:number
  lon:number
  total:string
  constructor(
    public formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private geolocation: Geolocation,
    private auth: AuthService
  ) {
    /* se traen datos del guardia y la ronda */
    new Promise((resolve, reject) => {
      this.guard = this.auth.guardData()
      resolve()
    }).then(() => {
      this.shifts$ = this.api.getGuardShift(this.guard.id)
      this.api.getGuardShift(this.guard.id).toPromise()
        .then((data: any) => {
          this.shifts = data.shifts;
        })
    })
  }


/* se guarda el boton de emergencia seleccionado en el servicio de la api de registrar reportes */
  reportes(data: string) {
   
    switch (data) {
      case 'Ambulance':
        this.api.report({ type: data, clientId: this.guard.client, shiftId: this.guard.shiftId }).toPromise()
          .then((data:any)=>{
          })
        break;
      case 'Police':
        this.api.report({ type: data, clientId: this.guard.client, shiftId: this.guard.shiftId }).toPromise()
        .then((data:any)=>{
        })
        break;
      case 'Firefighter':
        this.api.report({ type: data, clientId: this.guard.client, shiftId: this.guard.shiftId }).toPromise()
        .then((data:any)=>{
        })
        break;
      case 'Office1':
        this.api.report({ type: data, clientId: this.guard.client, shiftId: this.guard.shiftId }).toPromise()
        .then((data:any)=>{
        })
        break;
      case 'Office2':
        this.api.report({ type: data, clientId: this.guard.client, shiftId: this.guard.shiftId }).toPromise()
        .then((data:any)=>{
        })
        break;

    }

  }

  
  getGeolocation(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
      console.log('latitud: '+this.lat)
      console.log('longitud: '+this.lon)
      /* var gps = this.lat + '%2C, ' + this.lon */
      var gps = this.lat +","+ this.lon
      /* console.log('coordenadas juntas: '+gps) */
      var guard_id = this.guard.id
      var timeLocation = '19:50'
      var client = this.guard.client
      var shiftId = this.guard.shiftId
      /* console.log('guard id: '+guard_id)
      console.log(timeLocation)
      console.log(client)
      console.log(shiftId) */
      this.api.gps(guard_id, shiftId, gps, client, timeLocation).toPromise()
      .then((data: any) => {

      })
    });
  }
}
