import { Injectable } from '@angular/core';
import { Artist } from '../Types/artist';

@Injectable()
export class DataHandlerService {
    private _artists: Array<Artist> = new Array<Artist>();

    public getAllArtists() {
        return this._artists;
    }
    
    public getArtist(name: string){
        return this._artists.find(artist => artist.name == name);
    }

    public addArtist(artist: Artist) {
        if(this._artists.findIndex(art => art.name == name) == -1) {
            this._artists.push(artist);
        } else {
            throw new AlreadyExistsError("the artist already exists");
        }
    }

    public removeArtist(artist: Artist) {
        let index = this._artists.findIndex(art => art.name == name);
        if(index != -1) {
            this._artists.splice(index, 1);
        } else {
            throw new DoesntExistsError("the artist doesn't exist");
        }
    }
}