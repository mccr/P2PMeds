import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../shared/route.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-route-new',
  templateUrl: './route-new.component.html',
  styleUrls: ['./route-new.component.min.css']
})
export class RouteNewComponent implements OnInit {

  constructor(private route: RouteService, private router: Router) { }

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
      this.router.navigate(['user', route['creator_id']['_id']])
    });
  }
}
