import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../shared/route.service';
import { PetitionService } from '../../shared/petition.service';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.min.css']
})
export class RouteComponent implements OnInit {
  routes: Array<Object>;

  constructor(private route: RouteService, private petition: PetitionService) { }

  ngOnInit() {
  }

  searchRoutes(myForm){
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
    this.route.list(formValue).subscribe((routes:Array<Object>) => this.routes = routes);
  }

  newPetition(routeID){
    console.log(routeID)
    this.petition.create(routeID).subscribe(petition => console.log(petition))
  }
}
