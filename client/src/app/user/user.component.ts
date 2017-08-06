import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { SessionService } from '../../shared/session.service';
import { PetitionService } from '../../shared/petition.service';
import { RouteService } from '../../shared/route.service';
import { RatingService } from '../../shared/rating.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import "rxjs/add/operator/mergeMap";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.min.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  user:Object;
  routesCreated:Array<Object> = [];
  petitionsMade:Array<Object> = [];
  routesWithPetitions:Array<Object>;
  show:boolean = false;
  showEditRoute:string = "";
  showRateForm:string = "";

  constructor(
    private router: Router,
    private session: SessionService,
    private UserService: UserService,
    private routeActv:ActivatedRoute,
    private petition: PetitionService,
    private RouteService: RouteService,
    private RatingService: RatingService
    ) {
    routeActv.params
    .mergeMap( p => UserService.show(p.id) )
    .subscribe( (info:Object) => {
      console.log(info);
      this.user = info['User'];
      this.routesCreated = info['routes'];
      this.routesWithPetitions = info['createData']
      this.petitionsMade = info['petitionData'];
    });
   }

  ngOnInit() {
  }

  showForm(){
    this.show = !this.show;
  }

  update(id, myForm) {
    this.UserService.update(id, myForm.value).subscribe(user => console.log(user));
    this.show = !this.show;
  }

  showEditRouteForm(e){
    if(this.showEditRoute == e.target.value){
      this.showEditRoute = "";
    } else {
      this.showEditRoute = e.target.value;
    }
  }
  editRoute(id, myEditRouteForm){
    this.RouteService.update(id, myEditRouteForm.value).subscribe((route) => console.log(route));
  }

  remove(id){
    this.RouteService.remove(id).subscribe( res => {
      this.routesCreated.forEach((r:any, i) => {
        if(r._id == id) this.routesCreated.splice(i, 1);
      });
    });
  }

  setStatus(id, event){
    console.log(event.target.value)
    this.petition.update(id, event.target.value).subscribe( (petition:any) => {
      {
        console.log(petition)
        if(petition.n == 1) {
          let result = this.routesWithPetitions.filter((e:any) => e._id == id);
          result[0]['status'] = event.target.value;
          if(event.target.value == 'Delivered to Carrier') {
            let res = this.petitionsMade.filter((e:any) => e._id == id);
            res[0]['status'] = event.target.value;
          }
        }
      }
    });
  }

  showFormRateUser(e){
    if(this.showRateForm == e.target.value){
      this.showRateForm = "";
    } else {
      this.showRateForm = e.target.value;
    }
  }
  rateUser(ratedUser_id, myRateForm){
    this.RatingService.create(ratedUser_id, myRateForm.value).subscribe( rating => console.log(rating))
  }
}
