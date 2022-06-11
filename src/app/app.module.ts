import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { ResultListComponent } from './search/result-list/result-list.component';
import { SearchComponent } from './search/search.component';
import { PopularMoviesComponent } from './home/popular-movies/popular-movies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuComponent } from './menu/menu.component';
import { FavoritesComponent } from './home/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    HomeComponent,
    SearchComponent,
    ResultListComponent,
    PopularMoviesComponent,
    MenuComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTooltipModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
