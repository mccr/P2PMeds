import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { SessionService } from '../../shared/session.service';
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
  show: boolean = false;

  constructor(private SessionService: SessionService, private UserService: UserService, private routeActv:ActivatedRoute) {
    routeActv.params
    .mergeMap( p => UserService.show(p.id) )
    .subscribe( (user:Object) => {
      console.log(user);
      this.user = user;
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
}
