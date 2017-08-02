import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../shared/route.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-route-new',
  templateUrl: './route-new.component.html',
  styleUrls: ['./route-new.component.css']
})
export class RouteNewComponent implements OnInit {

  constructor(private route: RouteService) { }

  ngOnInit() {
  }

  newRoute(myForm){
    console.log(myForm.value)
    this.route.create(myForm.value).subscribe((route) => console.log(route) );
  }
}
