import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../shared/route.service';
import { PetitionService } from '../../shared/petition.service';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {
  routes: Array<Object>;

  constructor(private route: RouteService, private petition: PetitionService) { }

  ngOnInit() {
  }

  searchRoutes(myForm){
    console.log(myForm.value)
    this.route.list(myForm.value).subscribe((routes:Array<Object>) => this.routes = routes );
  }

  newPetition(routeID){
    console.log(routeID)
    this.petition.create(routeID).subscribe(petition => console.log(petition))
  }
}
