import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { SessionService } from '../../shared/session.service';
import { UserService } from '../../shared/user.service';
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.min.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/api/user/${this.session.user['_id']}`
   });
  updates = {
    email: '',
    profilePic: ''
  }

  constructor(
    public userEditDialogRef: MdDialogRef<UserEditComponent>,
    private session: SessionService,
    private userService: UserService
  ) {}

  ngOnInit() {
  }

  update(id, myForm) {
    console.log(this.updates)
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('email', this.updates.email);
      form.append('profilePic', this.updates.profilePic);
      };
  this.uploader.uploadAll();
  console.log('uploaded');
  this.userEditDialogRef.close();
  }
  //   this.userService.update(id, myForm.value).subscribe(user => {
  //     this.userEditDialogRef.close(user);
  //   });
  // }

}
