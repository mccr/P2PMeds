import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../shared/route.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import "rxjs/add/operator/mergeMap";

@Component({
  selector: 'app-route-update',
  templateUrl: './route-update.component.html',
  styleUrls: ['./route-update.component.css']
})
export class RouteUpdateComponent implements OnInit {
  route: Object;

  constructor(private RouteService: RouteService, private routeActv:ActivatedRoute) {

   }

  ngOnInit() {
  }

  editRoute(myForm){
    this.routeActv.params
    .mergeMap( p => RouteService.update(p.id, myForm.value) )
    .subscribe( (route:Object) => {
      console.log(route);
      this.route = route;
    });
    // console.log(myForm.value)
    // this.route.update(myForm.value).subscribe((route) => console.log(route) );
  }

}
