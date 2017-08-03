import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RouteService {
  endpoint: string;
  options:object = {withCredentials:true};

  params = new URLSearchParams();

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

  list(query):Observable<object> {
    this.params['from'] = query.from;
    this.params['to'] = query.to;
    this.params['date'] = query.date;
    return this.http.get(`${this.endpoint}/route/list`, {withCredentials:true, params: this.params})
      .map(res => res.json())
      .catch(this.handleError);
  }

  show(id:string):Observable<object> {
    return this.http.get(`${this.endpoint}/route/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  create(Route):Observable<object> {
    console.log(Route)
    return this.http.post(`${this.endpoint}/route`, Route, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  update(id:string, Route):Observable<object> {
    return this.http.put(`${this.endpoint}/route/${id}`, Route, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  remove(id:string):Observable<object> {
    return this.http.delete(`${this.endpoint}/route/${id}`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
