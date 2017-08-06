import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { RatingService } from '../../shared/rating.service';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.min.css']
})
export class UserRatingComponent implements OnInit {

  constructor(
    public userRatingDialogRef: MdDialogRef<UserRatingComponent>,
    private RatingService: RatingService
  ) { }

  ngOnInit() {
  }

  rateUser(ratedUser_id, myForm){
    console.log(myForm)
    //this.RatingService.create(ratedUser_id, myRateForm.value).subscribe( rating => console.log(rating))
  }
}
