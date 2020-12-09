import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  registerVisitorForm: FormGroup

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    ) { 
      this.registerVisitorForm = this.createRegisterVisitorForm();
    }

  ngOnInit() {
  }
  createRegisterVisitorForm(){
    return this.formBuilder.group({
      firstname: new FormControl ('', Validators.required),
      lastname: new FormControl ('', Validators.required),
      rut: new FormControl ('', Validators.required),
      patente: new FormControl ('', Validators.required),           
    })
  }
  async closeModal(){
    await this.modalController.dismiss();
  }
}
