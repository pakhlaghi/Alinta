import { Movie } from './movie.model';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Http } from "@angular/http";

@Injectable()
export class HomeService {
  private url = 'https://alintacodingtest.azurewebsites.net/api/Movies?callback=JSONP_CALLBACK';

  constructor(private http: Http) { }

  public getMovies (): Observable<any> {
    let url = 'api/Movies';
    return this.http.request(url).map((res) => res.json());
  }

}
