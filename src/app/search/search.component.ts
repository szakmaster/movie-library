import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Subject, takeUntil } from 'rxjs';
import { Movie } from '../shared/models/movie';
import { TmdbService } from '../shared/tmdb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef | undefined;
  private destroySubject$ = new Subject<boolean>();
  isLoading = false;
  searchResult!: Movie[];
  selectedMovie: any;

  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
    // Subscribe to the search request
    fromEvent(this.searchInput?.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      filter((searchQuery: string) => searchQuery.length > 4),  // min char length must be > 4
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
        },
        error: (error) => console.log(`Error during search by ${query}: ${error}`),
        complete: () => this.isLoading = false
      });
    });
  }

  onMovieSelected(movie: any) {
    this.selectedMovie = movie;
  }

  ngOnDestroy(): void {
      this.destroySubject$.next(true);
  }
}
