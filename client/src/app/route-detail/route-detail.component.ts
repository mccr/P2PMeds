import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../shared/route.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import "rxjs/add/operator/mergeMap";

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements OnInit {
  route: Object;

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

}
