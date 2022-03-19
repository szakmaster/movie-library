import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_KEY } from "src/config/api-key";

const API = {
  SEARCH: 'https://api.themoviedb.org/3/search/movie?api_key=<api_key>&language=en-US&query=<query>&page=<page>&include_adult=false',
  CREDITS: 'https://api.themoviedb.org/3/movie/<movie_id>/credits?api_key=<api_key>'
}

@Injectable({
  providedIn: 'root'
})

export class TmdbService {
  private apiKey: string = API_KEY;

  constructor(private http: HttpClient) { }

  searchMovie(searchQuery: any, page: number = 1) {
    return this.http.get(API.SEARCH.replace('<api_key>', `${this.apiKey}`).replace('<query>', `${searchQuery}`).replace('<page>', `${page}`));
  }

  getCredits(movieId: number) {
    return this.http.get(API.CREDITS.replace('<movie_id>', `${movieId}`).replace('<api_key>', `${this.apiKey}`));
  }
}
