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
  constructor(
    private auth: AuthService,
    private modalController: ModalController,
    private api: ApiService
  ) {
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
        console.table(this.visitas)
        
      })


  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SecondPage
    });
    return await modal.present();
  }



  ngOninit() {
  }

}

