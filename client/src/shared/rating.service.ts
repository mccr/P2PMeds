import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RatingService {
  endpoint: string;
  options:object = {withCredentials:true};

  constructor(
    private http:Http,
    @Inject('BASE_ENDPOINT') private BASE,
    @Inject('API_ENDPOINT') private API
  ) {
    this.endpoint = BASE + API;
   }

  handleError(e) {
    console.error("Error en la llamada a la API");
    return Observable.throw(e.json().message);
  }

  show(userID:string):Observable<object> {
    return this.http.get(`${this.endpoint}/rating/${userID}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  create(ratedUser_id, rating):Observable<object> {
    return this.http.post(`${this.endpoint}/rating`, {stars: rating.stars, comment: rating.comment, ratedUser_id: ratedUser_id}, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  update(id:string, status:string):Observable<object> {
    return this.http.put(`${this.endpoint}/petition/${id}`, {status: status}, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

}
