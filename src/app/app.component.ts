import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from './services/dataHandlerService.service';
import { Track } from './Types/track';
import { Artist } from './Types/artist';
import { TrackArtistPair } from './Types/track-artist-pair';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	private _artists: Array<Artist>;
	private _addArtistCount = 0;

	constructor(private _dataHandlerSrv: DataHandlerService) {
		this._artists = _dataHandlerSrv.getAllArtists();
	}

	ngOnInit() {
		document.querySelector('html').style.height = '100%';
		document.querySelector('body').style.height = '100%';
		document.querySelector('body').style.margin = '0';
	}

	private _addArtist(artist: Artist) {
		this._dataHandlerSrv.addArtist(artist)
			.then((art) => {
				console.log(`artist added: ${art.name}`)
				this._addArtistCount++;
			}).catch(console.log);
	}

	private _addTrack(trackArtistPair: TrackArtistPair) {
		let isNewArtist: boolean = false;
		if (this._artists.findIndex(artist => artist.name == trackArtistPair.artistName) == -1) {
			isNewArtist = true;
		}
		this._dataHandlerSrv.addTrack(trackArtistPair.artistName, trackArtistPair.track)
			.then((song) => {
				if (isNewArtist) {
					this._addArtistCount++;
				}
			}).catch(console.log);
	}
}