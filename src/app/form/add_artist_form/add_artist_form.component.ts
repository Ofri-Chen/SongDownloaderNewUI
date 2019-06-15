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
    public artistName: string;
    public numOfTracks: number;

    @Output('artist') artist = new EventEmitter<Artist>();

    constructor(private _srvComService: SrvComService, private _dataHandlerSrv: DataHandlerService) {
    }

    ngOnInit(): void {
    }

    public async performSearch() {
        const artist = await this._srvComService.getTopTracks(this.artistName, this.numOfTracks);
        const tracks: Track[] = artist.tracks.map(track => ({
            name: track,
            curr_video: 0
        }));

        this.artist.emit({
            name: artist.name,
            tracks: tracks,
            withLyrics: artist.withLyrics
        });
    }
}