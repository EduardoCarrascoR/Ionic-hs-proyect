import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api.service';
import { Observable } from 'rxjs';
import { Shift } from '../models/shift.interface';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { RondasPage } from '../modals/rondas/rondas.page';
import { Guard } from '../models/guard.interface';
import { AuthService } from '../providers/auth.service';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Router } from '@angular/router';
import { $ } from 'protractor';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  shifts$: Observable<Shift[]>
  guard: Guard
  shifts: Shift[]
  shift: Shift
  
  shiftId 
  constructor(
    private api: ApiService,
    private browser: InAppBrowser,
    private localNotifications: LocalNotifications,
    private auth: AuthService,
    private plt: Platform,
    private modalController: ModalController,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    new Promise((resolve, reject) => {
      this.guard = this.auth.guardData()
     /*  console.table(this.guard) */
      resolve()
    }).then(() => {
      this.shifts$ = this.api.getGuardShift(this.guard.id)
      this.api.getGuardShift(this.guard.id).toPromise()
        .then((data: any) => {
          this.shifts = data.shifts;
          console.table(this.shifts)
        })
    })

    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        console.log('click', res);
        let msg = res.data ? res.data.mysata : '';
        this.showAlert(res.title, res.text, msg);
      });
      this.localNotifications.on('trigger').subscribe(res => {
        console.log('trigger', res);
        let msg = res.data ? res.data.mysata : '';
        this.showAlert(res.title, res.text, msg);
      });

    });
  }
ngOnInit (){
}
async openModal(shift) {
  const modal = await this.modalController.create({
    component: RondasPage,
    componentProps: shift
  });
  return await modal.present();
}

saveId(){
  console.log(this.shiftId)
  
  this.guard.shiftId = parseInt(this.shiftId.split('$')[0])
  this.guard.client = parseInt(this.shiftId.split('$')[1])
 /*  this.shift. = client.toString() */
  localStorage.setItem('guard',JSON.stringify(this.guard))


  console.table(this.guard)
}


  openUrl() {
    this.browser.create('https://www.google.cl/maps/', '_self')
  }



  async notification() {
    await this.localNotifications.schedule({
       id: 10,
       title: 'Recordatorio de ronda',
       text: 'Recuerde registrar si ha ocurrido algún incidente',
       data: { mysata: 'mensaje oculto de la notificacion' },
       /*    trigger: { in: 60, unit: ELocalNotificationTriggerUnit.MINUTE }, */
       trigger: { in: 10, unit: ELocalNotificationTriggerUnit.SECOND },
       foreground: true,
  
     })
     this.router.navigate(['tabs/tab4'])
   }
  
   showAlert(header, sub, msg) {
     this.alertCtrl.create({
       header: header,
       subHeader: sub,
       message: msg,
       buttons: ['OK']
     }).then(alert => alert.present());
   }

}



