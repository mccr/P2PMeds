import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SessionFBService {
  user: Object; // The current logged in user
  startLoginCompleted:boolean = false;
  endpoint: string;
  options:object = {withCredentials:true};

  constructor(
    private http:Http,
    @Inject('BASE_ENDPOINT') private BASE,
    @Inject('API_ENDPOINT') private API
  ) {
    this.endpoint = BASE + API;
    this.isLoggedIn().subscribe( (user:Object) =>{
      console.log(`Welcome again user ${user.username}`)
      this.user = user;
      this.startLoginCompleted = true;
    }, e => this.startLoginCompleted = true);
  }


  handleError(e) {
    console.error("Error en la llamada a la API");
    return Observable.throw(e.json().message);
  }

  login():Observable<Object> {
    return this.http.get(`${this.endpoint}/facebook`, this.options)
      .map(res => {
        this.user = res.json();
        return this.user;
      })
      .catch(this.handleError);
  }

  logout():Observable<Object>{
    return this.http.get(`${this.endpoint}/logout`, this.options)
      .map(res => {
        res.json();
        this.user = undefined;
      })
      .catch(this.handleError);
  }

  isLoggedIn():Observable<Object>{
    return this.http.get(`${this.endpoint}/loggedin`, this.options)
      .map(res => {
        this.user = res.json();
        return this.user;
      })
      .catch(this.handleError);
  }

}
