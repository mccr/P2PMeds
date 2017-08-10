import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../shared/route.service';
import { PetitionService } from '../../shared/petition.service';
import { SessionService } from '../../shared/session.service';
import { AirportService } from '../../shared/airport.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.min.css']
})
export class RouteComponent implements OnInit {
  routesData: Array<Object>;
  message:string;
  veAirports: Array<string>;
  worldAirports: Array<string>;

  constructor(
    private route: RouteService,
    private petition: PetitionService,
    private session: SessionService,
    private airport: AirportService
  ) {
    airport.list().subscribe( airports => {
      this.veAirports = airports['veAirports'];
      this.worldAirports = airports['worldAirports'];
    })
   }

  ngOnInit() {
  }

  searchRoutes(myForm){
    if(myForm.value.from && myForm.value.to && myForm.value.date){
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
  }

  newPetition(routeID, e){
      let button = e.target;
      let route = this.routesData.filter( (r:object) => r['route']['_id'] == routeID);
      console.log(this.session.user['_id'])
      console.log(route[0])
      let petitionDone = route[0]['petitions'].filter( p => p['requestUser'] == this.session.user['_id']);
        if(petitionDone.length != 0) {
          button.textContent = 'you made a petition';
          button.disabled = true;
        } else  {
          this.petition.create(routeID).subscribe(petition => {
            console.log(petition)
            let petitionChange = this.routesData['route'].filter(r => r['_id'] == routeID);
            petitionChange
          })
        }
  }
}
