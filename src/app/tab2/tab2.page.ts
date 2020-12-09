import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { SecondPage } from '../modals/second/second.page';
import { ApiService } from '../providers/api.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  private visitas = []
  
  constructor(
   
    private modalController: ModalController,
    private api: ApiService
  ) { 
    this.api.getVisitors().toPromise()
      .then((data:any)=>{
        this.visitas=data.visitors
        console.log(data)
      })

      
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SecondPage
    });
    return await modal.present();
  }

  

  ngOninit(){
  }

}

