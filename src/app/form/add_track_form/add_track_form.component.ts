import {Component, Output, EventEmitter } from '@angular/core';
import { Track } from '../../Types/track';
import { TrackArtistPair } from '../../Types/track-artist-pair';

@Component({
    selector: 'add-track-form',
    templateUrl: './add_track_form.component.html',
    styleUrls: ['./add_track_form.component.css']
})
export class AddTrackFormComponent {
    @Output() addTrack = new EventEmitter<TrackArtistPair>();

    private _artistName: string = "Metallica";
    private _trackName: string = "Nothinig Else Matters";

    ngOnInit(): void {
        this._artistName = "Foo Fighters"; 
        this._trackName = "Everlong";
    }

    private _addTrack() {
        this.addTrack.emit({artistName: this._artistName, track: {name: this._trackName, curr_video: 0}});
    }
}