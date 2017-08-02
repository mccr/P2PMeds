import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../shared/route.service';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {
  routes: Array<Object>;

  constructor(private route: RouteService) { }

  ngOnInit() {
  }

  searchRoutes(myForm){
    console.log(myForm.value)
    this.route.list(myForm.value).subscribe((routes:Array<Object>) => console.log(routes) );
  }

  remove(id){
    this.route.remove(id).subscribe();
  }
}
