import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { RouteService } from '../../shared/route.service';

@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.min.css']
})
export class RouteEditComponent implements OnInit {

  constructor(public routeEditDialogRef: MdDialogRef<RouteEditComponent>, private routeService: RouteService) { }

  ngOnInit() {
  }

  updateRoute(myForm){
    console.log(myForm.value);
    //this.routeService.update(id, myEditRouteForm.value).subscribe((route) => console.log(route));
  }
}
