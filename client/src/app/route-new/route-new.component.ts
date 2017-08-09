import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../shared/route.service';
import { AirportService } from '../../shared/airport.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-route-new',
  templateUrl: './route-new.component.html',
  styleUrls: ['./route-new.component.min.css']
})
export class RouteNewComponent implements OnInit {
  veAirports:Array<string>;
  worldAirports:Array<string>;

  constructor(private route: RouteService, private router: Router, private airport: AirportService) {
    airport.list().subscribe( airports => {
      this.veAirports = airports['veAirports'];
      this.worldAirports = airports['worldAirports'];
    })
   }

  ngOnInit() {
  }

  newRoute(myForm){
    let day: string, month: string, year: string;
    day = (myForm.value.date.getDate() < 10) ? '0'+(myForm.value.date.getDate()) : myForm.value.date.getDate();
    month = (myForm.value.date.getMonth() < 10) ? '0'+(myForm.value.date.getMonth()+1) : (myForm.value.date.getMonth()+1);
    year = myForm.value.date.getFullYear();
    let formValue: Object = {
      from: myForm.value.from,
      to: myForm.value.to,
      date: year+'-'+month+'-'+day
    }
    console.log(formValue)
    this.route.create(formValue).subscribe((route:Object) => {
      console.log(route);
      this.router.navigate(['user', route['creator_id']['_id']])
    });
  }
}
