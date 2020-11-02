import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api.service';
import { Observable } from 'rxjs';
import { Shift } from '../models/shift.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  shifts$: Observable<Shift[]>

  constructor(
    private api:ApiService 
  ) {}
ngOnInit (){
 this.shifts$ = this.api.getGuardShift()
}
}

