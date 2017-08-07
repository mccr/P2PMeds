import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import { RouteService } from '../../shared/route.service';

@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.min.css']
})
export class RouteEditComponent implements OnInit {
  routeID: string;

  constructor(
    public routeEditDialogRef: MdDialogRef<RouteEditComponent>,
    private routeService: RouteService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
    this.routeID = data;
   }

  ngOnInit() {
  }

  updateRoute(myForm){
    let date;
    console.log(myForm.value);
    if(myForm.value.date){
      let day: string, month: string, year: string;
      day = (myForm.value.date.getDate() < 10) ? '0'+(myForm.value.date.getDate()) : myForm.value.date.getDate();
      month = (myForm.value.date.getMonth() < 10) ? '0'+(myForm.value.date.getMonth()+1) : (myForm.value.date.getMonth()+1);
      year = myForm.value.date.getFullYear();
      date = year+'-'+month+'-'+day;
    }

    let formValue: Object = {
      from: myForm.value.from,
      to: myForm.value.to,
      date: date
    }
    this.routeService.update(this.routeID, formValue).subscribe((route) => console.log(route));
    this.routeEditDialogRef.close()
  }
}
