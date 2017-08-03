import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PetitionService {
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

  create(routeID):Observable<object> {
    console.log(routeID)
    return this.http.post(`${this.endpoint}/petition`, {route_id: routeID}, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  update(id:string, status:string):Observable<object> {
    return this.http.put(`${this.endpoint}/petition/${id}`, {status: status}, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

}
