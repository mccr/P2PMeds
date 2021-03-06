import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
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

  show(id:string):Observable<object> {
    return this.http.get(`${this.endpoint}/user/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  update(id:string, update:Object):Observable<object> {
    console.log('service', id, update)
    return this.http.post(`${this.endpoint}/user/${id}`, update, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
