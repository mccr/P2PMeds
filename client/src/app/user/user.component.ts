import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { SessionService } from '../../shared/session.service';
import { PetitionService } from '../../shared/petition.service';
import { ActivatedRoute } from '@angular/router';
import "rxjs/add/operator/mergeMap";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  user: Object;
  routesCreated: Array<Object>;
  petitionsMade: Array<Object>;

  show: boolean = false;

  constructor(
    private SessionService: SessionService,
    private UserService: UserService,
    private routeActv:ActivatedRoute,
    private petition: PetitionService
    ) {
    routeActv.params
    .mergeMap( p => UserService.show(p.id) )
    .subscribe( (info:Object) => {
      console.log(info);
      this.user = info['User'];
      this.routesCreated = info['createData'];
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

  confirm(id){
    console.log(id)
    this.petition.update(id, 'confirmed').subscribe( petition => console.log(petition));
  }

  reject(id){
    this.petition.update(id, 'rejected').subscribe( petition => console.log(petition));
  }
}
