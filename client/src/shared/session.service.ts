import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { User } from './interfaces';

@Injectable()
export class SessionService {
  user: User; // The current logged in user
  startLoginCompleted:boolean = false;
  endpoint: string;
  options:object = {withCredentials:true};

  constructor(
    private http:Http,
    @Inject('BASE_ENDPOINT') private BASE,
    @Inject('API_ENDPOINT') private API
  ) {
    this.endpoint = BASE + API;
    this.isLoggedIn().subscribe( (user:User) =>{
      console.log(`Welcome again user ${user.name}`)
      this.user = user;
      this.startLoginCompleted = true;
    }, e => this.startLoginCompleted = true);
  }


  handleError(e) {
    console.error("Error en la llamada a la API");
    return Observable.throw(e.json().message);
  }

  login():Observable<User> {
    return this.http.get(`${this.endpoint}/facebook`)
      .map(res => {
        this.user = res.json();
        return this.user;
      })
      .catch(this.handleError);
  }

  logout():Observable<object>{
    return this.http.get(`${this.endpoint}/logout`, this.options)
      .map(res => {
        res.json();
        this.user = undefined;
      })
      .catch(this.handleError);
  }

  isLoggedIn():Observable<User>{
    return this.http.get(`${this.endpoint}/loggedin`, this.options)
      .map(res => {
        this.user = res.json();
        return this.user;
      })
      .catch(this.handleError);
  }

}
