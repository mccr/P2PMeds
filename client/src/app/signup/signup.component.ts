import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../shared/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.min.css']
})
export class SignupComponent implements OnInit {
  error: string;

  constructor(private session: SessionService, private router: Router) { }

  ngOnInit() {
  }

  signup(form) {
    console.log(form.value);
    this.session.signup(form.value)
      .subscribe(
      (user) => {
        this.session.isLoggedIn().subscribe( user => {
          console.log(user)
          this.router.navigate([''])
        })
      },
      (err) => this.error = err
      );
  }
}
