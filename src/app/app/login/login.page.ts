import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  variableRut
  constructor(
    private auth: AuthService,
    public formBuilder: FormBuilder,

  ) { }
  /* instancia el formulario con la estructura de formulario de login */
  ngOnInit() {
    this.loginForm = this.createLoginForm()
  }

  /* usa los datos del login para llamar al servicio de login de la api */
  login() {
    this.auth.login(this.loginForm.value)
  }

  //formulario de login
  createLoginForm() {
    return this.formBuilder.group({
      rut: ['', Validators.required],
      password: ['', Validators.required]
    })
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
      /*   console.log(data) */
        div1 = data.slice(0, 1);
        div2 = data.slice(1, 4);
        div3 = data.slice(4, 7);
        div4 = data.slice(7, 8);
        var formatRut = div1 + '.' + div2 + '.' + div3 + '-' + div4
        this.variableRut = formatRut
        break;
      case data.length == 9:
      /*   console.log(data) */
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
