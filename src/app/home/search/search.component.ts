import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie';
import { TmdbService } from 'src/app/shared/tmdb.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef | undefined;
  @Output() isSearchResult: EventEmitter<boolean> = new EventEmitter();
  private destroySubject$ = new Subject<boolean>();
  isLoading = false;
  searchResult!: Movie[];
  selectedMovie: any;
  minSearchCriteriaLength: number = 3;

  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
    // Subscribe to the search request
    fromEvent(this.searchInput?.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      filter((searchQuery: string) => searchQuery.length >= this.minSearchCriteriaLength),
      debounceTime(1000), // wait 1 sec between keyUp events
      distinctUntilChanged(),  // ignore the same search queries
      takeUntil(this.destroySubject$)
    ).subscribe((query: string) => {
      this.isLoading = true;

      this.tmdbService.searchMovie(query).pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.searchResult = response.results as Movie[];
          this.searchResult = this.sortSearchResultByReleaseDate(this.searchResult);
          this.isSearchResult.emit(this.searchResult.length > 0);
        },
        error: (error) =>  { 
          console.log(`Error during search by ${query}: ${error}`); 
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      });
    });
  }

  onMovieSelected(movie: any) {
    this.selectedMovie = movie;
  }

  clearSearchResults() {
    this.searchResult = [];
  }

  ngOnDestroy(): void {
      this.destroySubject$.next(true);
  }

  private sortSearchResultByReleaseDate(movies: Movie[]) {
    return movies.sort((a, b) => (a.release_date < b.release_date) ? 1 : -1);
  }
}
