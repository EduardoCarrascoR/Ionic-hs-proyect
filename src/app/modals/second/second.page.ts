import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Guard } from 'src/app/models/guard.interface';
import { AuthService } from 'src/app/providers/auth.service';
import { ApiService } from 'src/app/providers/api.service';
import { Shift } from 'src/app/models/shift.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {
  guard: Guard
  registerVisitorForm: FormGroup
  shifts$: Observable<Shift[]>
  shifts: Shift[]
  variableRut

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private api: ApiService,
    public toastController: ToastController,
    private router: Router
  ) {
    /* Trae los datos del guardia */
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
    /* instacia la variable conn lo registrado en el formulario */
    this.registerVisitorForm = this.createRegisterVisitorForm();
  }

  ngOnInit() {
  }
  /* crea el formato del formulario a usar */
  createRegisterVisitorForm() {
    return this.formBuilder.group({
      name: new FormControl('', Validators.required),
      rut: new FormControl('', Validators.required),
      patent: new FormControl('', Validators.required),
      shiftId: [this.guard.shiftId, Validators.required],
      in: new FormControl(JSON.stringify(''), Validators.required),
    })
  }

/* Envia los datos del formulario a la api */
  registerVisitor() {
    this.api.registerVisitor(this.registerVisitorForm.value).toPromise().then(() => {
      console.log(this.registerVisitorForm.value)
      this.router.navigate(['tabs/tab2'])
    }).catch(error => { 
      this.presentToast('Error al guardar visitante') 
    })
  }
  
  async closeModal() {
    await this.modalController.dismiss();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }

  async  rut() {
    var div1, div2, div3, div4;
    var data = this.variableRut

    switch (true) {
      case data.length == 1:
        return data;
      case data.length == 2:
        return data;
      case data.length == 3:
        return data;
      case data.length == 4:
        return data;
      case data.length == 5:
        return data;
      case data.length == 6:
        return data;
      case data.length == 7:
        return data;
      case data.length == 8:
       /*  console.log(data) */
        div1 = data.slice(0, 1);
        div2 = data.slice(1, 4);
        div3 = data.slice(4, 7);
        div4 = data.slice(7, 8);
        var formatRut = div1 + '.' + div2 + '.' + div3 + '-' + div4
        this.variableRut = formatRut
        break;
      case data.length == 9:
       /*  console.log(data) */
        div1 = this.variableRut.slice(0, 2);
        div2 = this.variableRut.slice(2, 5);
        div3 = this.variableRut.slice(5, 8);
        div4 = this.variableRut.slice(8, 9);
        var formatRut = div1 + '.' + div2 + '.' + div3 + '-' + div4
        this.variableRut = formatRut
        break;
      }
      return this.variableRut

  }

  
}
