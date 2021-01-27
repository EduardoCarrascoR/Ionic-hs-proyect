import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { SecondPage } from '../modals/second/second.page';
import { ApiService } from '../providers/api.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Shift } from '../models/shift.interface';
import { Observable } from 'rxjs';
import { Guard } from '../models/guard.interface';
import { AuthService } from '../providers/auth.service';
import { Visitor } from '../models/visitor.interface'
import { OutPage } from '../modals/out/out.page'
import { Out } from '../models/out.interface';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  visitas: Visitor[]
  visitas$: Observable<Visitor[]>
  shifts: Shift[]
  shifts$: Observable<Shift[]>
  guard: Guard
  out: Visitor
  lat:number
  lon:number
  total:string
  constructor(
    private auth: AuthService,
    private geolocation: Geolocation,
    private modalController: ModalController,
    private api: ApiService
  ) {
    /* se traen los datos del guardia, rondas y visitas */
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

    this.visitas$ = this.api.getVisitors(this.guard.shiftId)
    this.api.getVisitors(this.guard.shiftId).toPromise()
      .then((data: any) => {
        this.visitas = data.visits;
        /* console.table(this.visitas) */
      })


  }

  /* refresh del listado de visitas con pull down */
  doRefresh( event ){

    setTimeout(()=>{
      this.visitas$ = this.api.getVisitors(this.guard.shiftId)
      this.api.getVisitors(this.guard.shiftId).toPromise()
        .then((data: any) => {
          this.visitas = data.visits;
        })
      event.target.complete();
    }, 1500);

  }
  /* abrir modal second page para abrir formulario de registro de visitas */
  async openModal() {
    const modal = await this.modalController.create({
      component: SecondPage
    });
    return await modal.present();
  }

  /* guarda la id de la visita */
  saveVisitData(visitId: number){
    this.guard.visitId = visitId
    sessionStorage.setItem('guard',JSON.stringify(this.guard))
    console.table(this.guard)
  }

  /* abrir modal para registrar la hora de salida de la visita */
  async openModal2() {
    const modal = await this.modalController.create({
      component: OutPage
    });
    return await modal.present();
  }


  ngOninit() {
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

