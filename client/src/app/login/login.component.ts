import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../shared/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string;
  username: string;
  password: string;

  constructor(private session: SessionService, private router: Router) { }

  ngOnInit() {

  }

  login() {
    console.log(this.username)
    console.log(this.password)
    this.session.login(this.username, this.password)
      .subscribe(
      (user) => {
        console.log(user)
        this.router.navigate([''])
      },
      (err) => this.error = err
      );
  }
}
