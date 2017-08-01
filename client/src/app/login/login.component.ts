import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../shared/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private session: SessionService) { }

  ngOnInit() {
  }

  login() {
    this.session.login();
  }

}
