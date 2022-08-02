import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from 'src/app/details/details.component';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {

  @Input() searchResult!: Movie[];

  tooltipShowDelay: number = 500; // millisecond
  tooltipHideDelay: number = 250;
  maxLengthOfMovieTitle: number = 25;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  pictureNotLoading(event: any) { 
    event.target.src = 'assets/imageNotFound.png'; 
  }

  openDialog(movie: Movie): void {
    const dialogRef = this.dialog.open(DetailsComponent, {
      width: '1024px',
      data: movie
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
