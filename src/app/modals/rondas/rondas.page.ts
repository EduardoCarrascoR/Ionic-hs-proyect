import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ApiService } from '../../providers/api.service';
import { Observable } from 'rxjs';
import { Shift } from '../../models/shift.interface';

@Component({
  selector: 'app-rondas',
  templateUrl: './rondas.page.html',
  styleUrls: ['./rondas.page.scss'],
})
export class RondasPage implements OnInit {
  shifts$: Observable<Shift[]>

  constructor(
    private modalController: ModalController,
    private browser: InAppBrowser,
    private api:ApiService ,
    ) {}

  ngOnInit() {
    this.shifts$ = this.api.getGuardShift()
  }

  async closeModal(){
    await this.modalController.dismiss();
  }
  openUrl (){
    this.browser.create('https://www.google.cl/maps/place/'+'Bellavista+52+Providencia','_self')
  }
  
}

