import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../shared/route.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import "rxjs/add/operator/mergeMap";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements OnInit {
  route: Object;
  show: boolean = false;

  constructor(private RouteService: RouteService, private routeActv:ActivatedRoute) {
    routeActv.params
    .mergeMap( p => RouteService.show(p.id) )
    .subscribe( (route:Object) => {
      console.log(route);
      this.route = route;
    });
  }

  ngOnInit() {
  }

  showForm(){
    this.show = !this.show;
  }
  editRoute(id, myForm){
    this.RouteService.update(id, myForm.value).subscribe((route) => console.log(route) );
  }
}
