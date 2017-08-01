import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  constructor(private UserService: UserService) { }

  ngOnInit() {
  }

  show(id) {
    this.UserService.show(id).subscribe();
  }
  update(id, email) {
    this.UserService.update(id, email).subscribe();
  }
}
