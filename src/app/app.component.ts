import { Component } from '@angular/core';
import { Artist } from './Types/artist';
import { DataHandlerService } from './services/dataHandlerService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	private _artists: Array<Artist>;

	constructor(private _dataHandlerSrv: DataHandlerService){
		this._artists = _dataHandlerSrv.getAllArtists();
	}

	_addArtist(artist: Artist) {
		this._dataHandlerSrv.addArtist(artist);		
	}
}
