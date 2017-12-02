import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SrvComService } from '../services/srvComService.service';
import { Artist } from '../Types/artist';
import { DataHandlerService } from '../services/dataHandlerService.service';


@Component({
    selector: 'form-component',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
    private _artistName: string;
    private _numOfTracks: number;

    @Output('artist') artist = new EventEmitter<Artist>();

    constructor(private _srvComService : SrvComService, private _dataHandlerSrv: DataHandlerService){
    }

    ngOnInit(): void {
        this._artistName = "Metallica"; 
        this._numOfTracks = 10;
    }

    private _performSearch() {
        let thisCopy = this; //otherwise it will be undefinded in the arrow function

        this._srvComService.getTopTracks({
            artistName: this._artistName,
            numOfTracks: this._numOfTracks
        }).then(function(artist) {
            thisCopy.artist.emit(artist);
            // thisCopy._dataHandlerSrv.addArtist(artist); //that's the arrow function :P
        }); 
    }
}