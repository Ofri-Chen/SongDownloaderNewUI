import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SrvComService } from '../../services/srvComService.service';
import { ServerArtist } from '../../Types/server-artist';
import { DataHandlerService } from '../../services/dataHandlerService.service';
import { Artist } from '../../Types/artist';
import { Track } from '../../Types/track';


@Component({
    selector: 'add-artist-form',
    templateUrl: './add_artist_form.component.html',
    styleUrls: ['./add_artist_form.component.css']
})
export class AddArtistFormComponent implements OnInit {
    private _artistName: string;
    private _numOfTracks: number;

    @Output('artist') artist = new EventEmitter<Artist>();

    constructor(private _srvComService: SrvComService, private _dataHandlerSrv: DataHandlerService) {
    }

    ngOnInit(): void {
        this._artistName = "Metallica";
        this._numOfTracks = 10;
    }

    private _performSearch() {
        let thisCopy = this; //otherwise it will be undefinded in the arrow function

        this._srvComService.getTopTracks(this._artistName, this._numOfTracks)
            .then(function (artist) {
                let tracks: Track[] = artist.tracks.map(track => {
                    return {
                        name: track,
                        curr_video: 0
                    }
                });
                thisCopy.artist.emit({
                    name: artist.name,
                    tracks: tracks,
                    withLyrics: artist.withLyrics
                });
                // thisCopy._dataHandlerSrv.addArtist(artist); //that's the arrow function :P
            });
    }
}