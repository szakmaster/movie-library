import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {

  @Input() searchResult!: Movie[];
  @Output() onSelectedMovie: EventEmitter<Movie> = new EventEmitter<Movie>();

  tooltipShowDelay: number = 500; // millisecond
  tooltipHideDelay: number = 250;
  maxLengthOfMovieTitle: number = 25;

  constructor() { }

  ngOnInit() {
  }

  getMovieDetails(movie: Movie) {
    this.onSelectedMovie.emit(movie);
  }

  pictureNotLoading(event: any) { 
    event.target.src = 'assets/imageNotFound.png'; 
  }

}
