import { Component, OnInit } from '@angular/core';

import { Movie } from './homeShared/movie.model';
import { HomeService } from './homeShared/home.service';

import * as _ from 'lodash';

@Component({
  selector: 'alinta-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getMovies().subscribe((response: Movie[]) => {
      let fm = this.flatObj(response);
      this.movies = this.groupBy(fm);
    }, (error) => {
      console.error(error);
    });
  }

  private flatObj(response: Movie[]) {
    return _.uniqWith(_.flatMap(response, function (rsp) {
      return _.map(rsp.roles, function (role) {
        return {
          movie: rsp.name,
          actor: role.actor,
          name: role.name
        };
      });
    }), _.isEqual);
  }

  private groupBy(fm) {
    return _(fm).filter(f => f.actor != '').groupBy(x => x.actor).map((value, key) => ({ actor: key, obj: value })).value();
  }

}
