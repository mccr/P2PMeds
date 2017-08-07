import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../shared/route.service';
import { PetitionService } from '../../shared/petition.service';
import { SessionService } from '../../shared/session.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.min.css']
})
export class RouteComponent implements OnInit {
  routesData: Array<Object>;

  constructor(private route: RouteService, private petition: PetitionService, private session: SessionService) { }

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
    this.route.list(formValue).subscribe((foundData:Array<Object>) => {
      this.routesData = foundData
      console.log(this.routesData);
    });
  }

  newPetition(routeID){
    console.log(routeID)
    this.routesData.forEach( (r:object) => {
      if(r['route']['_id'] == routeID) {
        r['petitions'].forEach( p => {
          if( p['requestUser'] == this.session.user['_id'] ) console.log('user made a petition')
        })
      }
    })
    //this.petition.create(routeID).subscribe(petition => console.log(petition))
  }
}
