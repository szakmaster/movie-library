import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './movie/details/details.component';
import { HomeComponent } from './home/home.component';
import { ResultListComponent } from './search/result-list/result-list.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { PopularComponent } from './movie/popular/popular.component';
import { FavoritesComponent } from './movie/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    HomeComponent,
    SearchComponent,
    ResultListComponent,
    HeaderComponent,
    SidenavListComponent,
    PopularComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
