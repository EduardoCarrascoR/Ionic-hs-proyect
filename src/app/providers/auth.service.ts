import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Guard } from '../models/guard.interface';
import { Toast } from '@ionic-native/toast/ngx';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private api: ApiService,
    private router: Router,
    private toast: Toast
  ) {

  }
  login(userdata: Guard) {
    this.api.login(userdata.rut, userdata.password).toPromise()
      .then((res: any) => {
        if (res.success) {
          localStorage.setItem('guard', res.data)
          this.router.navigate(['/tabs/tab1'])
        } else {
          throw new Error('no se logro logear')
        }
      })
      .catch(error => {
        this.toast.show(error.error.mesage, '3000', 'center').toPromise()
          .then(toast => {
            console.log(toast)
          })
      })
  }
}
