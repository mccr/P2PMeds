import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { SessionService } from '../../shared/session.service';
import { PetitionService } from '../../shared/petition.service';
import { RouteService } from '../../shared/route.service';
import { RatingService } from '../../shared/rating.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { RouteEditComponent } from '../route-edit/route-edit.component';
import { UserRatingComponent } from '../user-rating/user-rating.component';
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
    private RatingService: RatingService,
    public dialog: MdDialog
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

  userEditDialog() {
     let userEditDialogRef = this.dialog.open(UserEditComponent, {
      height: '400px',
      width: '600px'
     });
     userEditDialogRef.afterClosed().subscribe(result => {
       console.log(result);
     });
   }

   userRatingDialog(e) {
     console.log(e.target.value)
     let petitionID = e.target.value;
      let userRatingDialogRef = this.dialog.open(UserRatingComponent, {
       height: '400px',
       width: '600px',
       data: petitionID
      });
      userRatingDialogRef.afterClosed().subscribe(result => {
        console.log(result);
      });
    }

   routeEditDialog(e) {
     console.log(e.target.value)
     let routeID = e.target.value;
      let routeEditDialogRef = this.dialog.open(RouteEditComponent, {
       height: '400px',
       width: '600px',
       data: routeID
      });
      routeEditDialogRef.afterClosed().subscribe(result => {
        console.log(result);
      });
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

}
