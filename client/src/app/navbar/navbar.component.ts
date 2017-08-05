import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../shared/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.min.css']
})

export class NavbarComponent implements OnInit {

  constructor(private session: SessionService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.session.logout().subscribe();
    this.router.navigate([''])
  }
}
