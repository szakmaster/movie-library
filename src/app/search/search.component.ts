import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie';
import { TmdbService } from 'src/app/shared/tmdb.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../movie/details/details.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef | undefined;
  private destroySubject$ = new Subject<boolean>();
  isLoading = false;
  searchResult: Movie[] = [] as Movie[];
  selectedMovie: Movie = {} as Movie; 
  minSearchCriteriaLength: number = 3;
  searchCriteriaLength: number = 0;
  delayBetweenKeyPresses: number = 1000;

  constructor(private tmdbService: TmdbService, private dialog: MatDialog) { }

  ngOnInit(): void {
    // Subscribe to the search request
    fromEvent(this.searchInput?.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(this.delayBetweenKeyPresses),
      distinctUntilChanged(),  // ignore the same search queries
      takeUntil(this.destroySubject$)
    ).subscribe((query: string) => {
      this.searchCriteriaLength = query.length;

      if (this.searchCriteriaLength >= this.minSearchCriteriaLength) {
        this.isLoading = true;

        this.tmdbService
          .searchMovie(query)
          .pipe(takeUntil(this.destroySubject$))
          .subscribe({
            next: (response: any) => {
              console.log(response);
              this.searchResult = response.results as Movie[];
              this.searchResult = this.sortSearchResultByReleaseDate(
                this.searchResult
              );
            },
            error: (error) => {
              console.log(`Error during search by ${query}: ${error}`);
              this.isLoading = false;
            },
            complete: () => (this.isLoading = false),
          });
      } else {
        this.searchResult = [];
      }
    });
  }

  onMovieSelected(movie: any) {
    this.selectedMovie = movie;

    this.dialog.open(DetailsComponent, {
      width      : '100%',
      maxWidth   : '1000px',
      height     : 'auto',
      hasBackdrop: true,
      maxHeight  : '850px',
      data: { ...this.selectedMovie },
    });
  }

  ngOnDestroy(): void {
      this.destroySubject$.next(true);

  }

  private sortSearchResultByReleaseDate(movies: Movie[]) {
    return movies.sort((a, b) => (a.release_date < b.release_date) ? 1 : -1);
  }
}
