import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { SecondPage } from '../modals/second/second.page';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private visitas = [{
    id: 1,
    title: 'Eduardo Carrasco',
    Rut: '8.888.888-2',
  },
  {
    id: 2,
    title: 'Eduardo Muñoz',
    Rut: '7.777.777-2',
  },
  {
    id: 3,
    title: 'Eduardo Cabrera',
    Rut: '5.555.555-2',

  },
  {
    id: 4,
    title: 'Eduardo Aguilar',
    Rut: '6.676.676-2',

  },
  {
    id: 5,
    title: 'Eduardo Muñoz',
    Rut: '7.777.777-2',
  },
  {
    id: 6,
    title: 'Eduardo Cabrera',
    Rut: '5.555.555-2',

  },
  {
    id: 7,
    title: 'Eduardo Aguilar',
    Rut: '6.676.676-2',

  }]
  
  constructor(
    private modalController: ModalController
  ) { }

  async openModal() {
    const modal = await this.modalController.create({
      component: SecondPage
    });
    return await modal.present();
  }

}
