import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Cast } from '../../shared/models/cast';
import { Crew } from '../../shared/models/crew';
import { Movie } from '../../shared/models/movie';

import { TmdbService } from '../../shared/tmdb.service';

@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  private _selected!: Movie;
  private  destroySubject$ = new Subject<boolean>();

  @Input()
  set selectedMovie(selected: Movie) {
    this._selected = selected;

    if (selected) {
      this.getCredits(this._selected.id);
    }
  }
  get selectedMovie() {
    return this._selected;
  }
  movie!: Movie;

  constructor(private tmdbService: TmdbService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
      this.destroySubject$.next(true);
  }

  getCredits(movieId: number) {
    this.tmdbService.getCredits(movieId).pipe(takeUntil(this.destroySubject$))
    .subscribe({
      next: (data: any) => {
        this._selected.crew_list = data.crew.map((map: { name: string; job: string; }) => {
          let crew = <Crew>({
            name: map.name,
            job: map.job
          })
          return crew;
        });

        this._selected.cast_list = data.cast.map((map: { name: string; character: string; profile_path: string; }) => {
          let cast = <Cast>({
            name: map.name,
            character: map.character,
            profile_path: map.profile_path
          })
          return cast;
        });
        this.movie = this._selected;
      },
      error: (error) => console.log(`Error of getting details: movieId -> ${movieId}: ${error}`)
    });
  }
}