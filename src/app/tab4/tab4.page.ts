import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
/* import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx'; */
import { Platform, AlertController, ToastController } from '@ionic/angular'
import { ApiService } from '../providers/api.service';
import { Guard } from '../models/guard.interface';
import { Shift } from '../models/shift.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../providers/auth.service';
import { Incident } from '../models/incident.interface';
import { Router } from '@angular/router';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  registerForm: FormGroup
  shifts$: Observable<Shift[]>
  shifts: Shift[]
  guard: Guard
  incident: Incident[]
  lat:number
  lon:number
  total:string

  constructor(
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    private api: ApiService,
    private plt: Platform,
    private geolocation: Geolocation,
    /* private localNotifications: LocalNotifications, */
    private auth: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) {

    /* se traen los datos del guardia y rondas */
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


    this.registerForm = this.createRegisterForm();
  }

  /* formato del formulario */
  createRegisterForm() {
    return this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      shiftId: [this.guard.shiftId, Validators.required]
    })
  }

  /* configuracion mensaje de alerta */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }

/* registrar los datos del formulario en el servicio de la api */
  register() {
    this.api.register(this.registerForm.value).toPromise().then(() => {
      this.router.navigate(['tabs/tab1'])
    }).catch(error => {
      /* mensaje de error */
      let text: string
      switch (error.error.message) {
        case 'shift has been finished or unauthorized':
          text = 'Este turno ya a terminado o no esta autorizado'
          break
        default:
          text = 'Ha ocurrido un error, intente nuevamente'
      }
      this.presentToast(text)
    })
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
