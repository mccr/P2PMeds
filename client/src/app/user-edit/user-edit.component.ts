import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { SessionService } from '../../shared/session.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.min.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  constructor(
    public userEditDialogRef: MdDialogRef<UserEditComponent>,
    private session: SessionService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  update(id, myForm) {
    this.userService.update(id, myForm.value).subscribe(user => {
      this.userEditDialogRef.close(user);
    });
  }

}
