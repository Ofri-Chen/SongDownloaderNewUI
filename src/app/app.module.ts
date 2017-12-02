import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { SrvComService } from './services/srvComService.service';
import { DataHandlerService } from './services/dataHandlerService.service';
import { ArtistDisplayerComponent } from './artist_displayer/artist_displayer.component';
import { TrackFilterPipe } from './pipes/searchPipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ArtistDisplayerComponent,
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