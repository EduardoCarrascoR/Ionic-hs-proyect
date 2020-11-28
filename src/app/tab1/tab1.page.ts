import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api.service';
import { Observable } from 'rxjs';
import { Shift } from '../models/shift.interface';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';
import { RondasPage } from '../modals/rondas/rondas.page';
import { Guard } from '../models/guard.interface';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  shifts$: Observable<Shift[]>
  guard: Guard

  constructor(
    private api: ApiService,
    private browser: InAppBrowser,
    private modalController: ModalController
  ) {}
ngOnInit (){
}
async openModal() {
  const modal = await this.modalController.create({
    component: RondasPage
  });
  return await modal.present();
}

  openUrl() {
    this.browser.create('https://www.google.cl/maps/', '_self')
  }
}

