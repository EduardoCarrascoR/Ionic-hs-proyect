import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor(private formBuilder: FormBuilder) {
  }

  createRegisterForm() {
    return this.formBuilder.group({
      incident: ['', Validators.required],
      other: ['', Validators.required]
    })
  }

}
