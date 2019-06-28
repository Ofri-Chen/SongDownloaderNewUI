import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { DataHandlerService } from '../services/dataHandlerService.service';
import { SrvComService } from '../services/srvComService.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Artist } from '../Types/artist';
import { Track } from '../Types/track';
import { TrackArtistPair } from '../Types/track-artist-pair';

@Component({
    selector: 'artist-displayer',
    templateUrl: './artist_displayer.component.html',
    styleUrls: ['./artist_displayer.component.css']
})
export class ArtistDisplayerComponent implements OnChanges {
    @Input('artists') _artists: Array<Artist>;
    @Input('addArtist') _addArtist: number;

    url: SafeResourceUrl;
    baseUrl: string = 'https://www.youtube.com/embed/';

    private _currTab: number = 0;
    private _filter: string = '';
    private currPlayingTrack: TrackArtistPair;

    constructor(private _dataHandlerSrv: DataHandlerService,
        private _srvComService: SrvComService,
        private sanitizer: DomSanitizer) {

        this._artists = _dataHandlerSrv.getAllArtists();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._currTab = this._artists.length == 0 ? 0 : this._artists.length - 1;
    }

    _changeTab(index: number) {
        this._currTab = index;
    }

    removeTrack(trackName: string) {
        let artistName = this._artists[this._currTab].name;
        if(this.currPlayingTrack && this.currPlayingTrack.track.name == trackName) {
            this._clearVideo();
        }        
        this._dataHandlerSrv.removeTrack(artistName, trackName);
        this._artists = this._dataHandlerSrv.getAllArtists();
        if (this._artists.findIndex(artist => artist.name == artistName) == -1) {
            this._removeArtistTabLogic(artistName);
        }
    }

    _downloadTracks() {
        this._srvComService.downloadTracks(this._artists[this._currTab]);
    }

    _changeTabColor(index: number): object {
        if (index == this._currTab) {
            return { 'background-color': 'rgba(160, 0, 181, 0.5)' };
        }
        else {
            return { 'background-color': 'rgb(136, 105, 217, 0.5)' };
        }
    }

    private _getRemoveArtistButtonColor(index: number) {
        if (index != this._currTab) {
            return { 'background-color': 'buttonface' };
        }
        else {
            return { 'background-color': 'buttonface' };
        }
    }

    private _removeArtist(artist: Artist) {
        if(this.currPlayingTrack && this.currPlayingTrack.artistName == artist.name) {
            this._clearVideo()
        }
        this._removeArtistTabLogic(artist.name);
        this._dataHandlerSrv.removeArtist(artist);
    }

    private _removeArtistTabLogic(artistName: string) {
        if (this._artists.length == 1) {
            this._currTab = 0;
        } else {
            if (this._currTab >= this._artists.findIndex(art => art.name == artistName)) {
                if (this._currTab != 0) {
                    this._currTab--;
                }
            }
        }
    }

    private _playVideo(track: Track) {
        let artist = this._artists[this._currTab];
        this._srvComService.getVideoId(artist.name, track.name, artist.withLyrics, track.curr_video)
            .then((videoId) => {
                this.url = this.sanitizer
                    .bypassSecurityTrustResourceUrl(`${this.baseUrl}${videoId}?autoplay=1`);
                track.videoId = videoId;
            });
        this.currPlayingTrack = { artistName: artist.name, track: track};
    }

    private nextVideo(track: Track) {
        track.curr_video++;
        this._playVideo(track);
    }

    private prevVideo(track: Track) {
        if (track.curr_video > 0) {
            track.curr_video--;
            this._playVideo(track);
        }
    }

    private _clearVideo() {
        this.url = '';
        this.currPlayingTrack = null;
    }
}