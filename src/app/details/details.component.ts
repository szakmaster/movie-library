import { Component, OnInit, Input, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Cast } from '../shared/models/cast';
import { Crew } from '../shared/models/crew';
import { Movie } from '../shared/models/movie';

import { TmdbService } from '../shared/tmdb.service';

@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  private destroySubject$ = new Subject<boolean>();
  movie: Movie;

  constructor(
    private tmdbService: TmdbService,
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Movie
  ) {
    this.movie = data;
  }

  ngOnInit() {
    if (this.movie?.id) {
      this.getCredits(this.movie.id);
    }
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(true);
  }

  getCredits(movieId: number) {
    this.tmdbService
      .getCredits(movieId)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: (data: any) => {
          this.movie.crew_list = data.crew.map(
            (map: { name: string; job: string }) => {
              let crew = <Crew>{
                name: map.name,
                job: map.job,
              };
              return crew;
            }
          );

          this.movie.cast_list = data.cast.map(
            (map: {
              name: string;
              character: string;
              profile_path: string;
            }) => {
              let cast = <Cast>{
                name: map.name,
                character: map.character,
                profile_path: map.profile_path,
              };
              return cast;
            }
          );
        },
        error: (error) =>
          console.log(
            `Error of getting details: movieId -> ${movieId}: ${error}`
          ),
      });
  }
}
