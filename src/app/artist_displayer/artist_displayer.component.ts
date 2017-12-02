import { Component, Input } from '@angular/core';
import { DataHandlerService } from '../services/dataHandlerService.service';
import { Artist } from '../Types/artist';

@Component({
    selector: 'artist-displayer',
    templateUrl: './artist_displayer.component.html',
    styleUrls: ['./artist_displayer.component.css']   
})
export class ArtistDisplayerComponent {
    @Input('artists') _artists: Array<Artist>;

    private _currTab: number = 0;
    private _filter: string = "";
    
    constructor(private _dataHandlerSrv: DataHandlerService ) {
        this._artists = _dataHandlerSrv.getAllArtists();
    }

    _changeTab(index: number) {
        this._currTab = index;
    }
}