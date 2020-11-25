import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Platform, AlertController } from '@ionic/angular'


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor(private formBuilder: FormBuilder, private plt: Platform,private localNotifications:LocalNotifications,
    private alertCtrl: AlertController) {
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

  createRegisterForm() {
    return this.formBuilder.group({
      incident: ['', Validators.required],
      other: ['', Validators.required]
    })
  }

  Notification(){
    this.localNotifications.schedule({
      id: 10,
      title: 'Recordatorio de ronda',
      text: 'Recuerde registrar si ha ocurrido algún incidente',
      data: { mysata: 'mensaje oculto de la notificacion'},
      trigger: {in: 30, unit: ELocalNotificationTriggerUnit.MINUTE},
      foreground: true,

    })
  }

  showAlert(header, sub, msg){
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['OK'] 
    }).then(alert => alert.present());
  }

}
