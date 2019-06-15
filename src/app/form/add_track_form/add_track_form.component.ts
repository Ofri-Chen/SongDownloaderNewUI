import { Component, Output, EventEmitter } from '@angular/core';
import { Track } from '../../Types/track';
import { TrackArtistPair } from '../../Types/track-artist-pair';

@Component({
    selector: 'add-track-form',
    templateUrl: './add_track_form.component.html',
    styleUrls: ['./add_track_form.component.css']
})
export class AddTrackFormComponent {
    @Output() addTrack = new EventEmitter<TrackArtistPair>();

    public artistName = '';
    public trackName = '';

    ngOnInit(): void {
    }

    private _addTrack() {
        this.addTrack.emit({ artistName: this.artistName, track: { name: this.trackName, curr_video: 0 } });
    }
}