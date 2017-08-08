import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import { RatingService } from '../../shared/rating.service';
import {IStarRatingOnClickEvent, IStarRatingOnRatingChangeEven, IStarRatingIOnHoverRatingChangeEvent} from "../../../node_modules/angular-star-rating/star-rating-struct.d";

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.min.css']
})
export class UserRatingComponent implements OnInit {
  ratedUserID: string;
  petitionID: string;
  rating: number;

  constructor(
    public userRatingDialogRef: MdDialogRef<UserRatingComponent>,
    private RatingService: RatingService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
    this.ratedUserID = data.ratedUserID;
    this.petitionID = data.petitionID;
   }

  ngOnInit() {
  }

    onClick = ($event) => {
        this.rating = $event.rating;
    };


  rateUser(myForm){
    let formValue = {
      stars: this.rating,
      comment: myForm.value.comment
    }
    console.log(formValue);
    this.RatingService.create(this.ratedUserID, formValue, this.petitionID).subscribe( rating => {
      this.userRatingDialogRef.close('true');
    })
  }
}
