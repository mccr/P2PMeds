import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AirportService {
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

  list():Observable<object> {
    return this.http.get(`${this.endpoint}/airports`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }


}
