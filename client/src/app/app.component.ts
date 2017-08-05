import { Component } from '@angular/core';
import { SessionService } from '../shared/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.min.css']
})
export class AppComponent {

  constructor (private session: SessionService, private router: Router) { }

  logout(){
    this.session.logout().subscribe();
    this.router.navigate([''])
  }

}
