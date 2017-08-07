import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import { RatingService } from '../../shared/rating.service';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.min.css']
})
export class UserRatingComponent implements OnInit {
  petitionID: string;

  constructor(
    public userRatingDialogRef: MdDialogRef<UserRatingComponent>,
    private RatingService: RatingService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
    this.petitionID = data;
   }

  ngOnInit() {
  }

  rateUser(myForm){
    console.log(this.petitionID, myForm.value)
    this.RatingService.create(this.petitionID, myForm.value).subscribe( rating => console.log(rating))
  }
}
