import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AddArtistFormComponent } from './form/add_artist_form/add_artist_form.component';
import { SrvComService } from './services/srvComService.service';
import { DataHandlerService } from './services/dataHandlerService.service';
import { ArtistDisplayerComponent } from './artist_displayer/artist_displayer.component';
import { TrackFilterPipe } from './pipes/searchPipe.pipe';
import { AddTrackFormComponent } from './form/add_track_form/add_track_form.component';

@NgModule({
  declarations: [
    AppComponent,
    AddArtistFormComponent,
    ArtistDisplayerComponent,
    AddTrackFormComponent,
    TrackFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
    ],
  providers: [SrvComService, DataHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }