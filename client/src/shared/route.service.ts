import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RouteService {
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
    return this.http.get(`${this.endpoint}/`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  show(id:string):Observable<object> {
    return this.http.get(`${this.endpoint}/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  create(Route):Observable<object> {
    return this.http.post(`${this.endpoint}/`, Route, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  update(id:string, Route):Observable<object> {
    return this.http.put(`${this.endpoint}/${id}`, Route, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  remove(id:string):Observable<object> {
    return this.http.delete(`${this.endpoint}/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
