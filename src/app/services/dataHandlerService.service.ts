import { Injectable } from '@angular/core';
import { ServerArtist } from '../Types/server-artist';
import { Artist } from '../Types/artist';
import { Track } from '../Types/track';

@Injectable()
export class DataHandlerService {
    private _artists: Array<Artist> = new Array<Artist>();

    public getAllArtists(): Array<Artist> {
        return this._artists;
    }

    public getArtist(name: string): Artist {
        return this._artists.find(artist => artist.name == name);
    }

    public addArtist(artist: Artist): Promise<Artist> {
        return new Promise((resolve, reject) => {
            if (this._artists.findIndex(art => art.name == artist.name) == -1) {
                this._artists.push(artist);
                resolve(artist);
            } else {
                reject(`artist already exists: ${artist.name}`);
            }
        });

    }

    public removeArtist(artist: Artist) {
        let index = this._artists.findIndex(art => art.name == artist.name);
        if (index != -1) {
            this._artists.splice(index, 1);
        } else {
            throw new DoesntExistsError("the artist doesn't exist");
        }
    }

    public addTrack(artistName: string, track: Track): Promise<Track> {
        track.name = track.name.trim();

        let index = this._artists.findIndex(art => art.name == artistName);

        return new Promise((resolve, reject) => {
            if (index != -1) {
                if (this._artists[index].tracks.findIndex(tr => tr.name == track.name) == -1) {
                    this._artists[index].tracks.unshift(track);
                    resolve(track);
                }
                else {
                    reject(`the artist ${artistName} already has the song ${track.name}`);
                }
            } else {
                let artistTracks = [track];
                this._artists.push({ name: artistName, tracks: artistTracks, withLyrics: true });
                resolve(track);
            }
        });

    }

    public removeTrack(artistName: string, trackName: string) {
        let artistIndex = this._artists.findIndex(artist => artist.name == artistName)
        if(artistIndex == -1) {
            return;
        }
        // let trackIndex = this._artists[artistIndex].tracks.findIndex((track) => track.name == trackName);
        let trackIndex = this._artists[artistIndex].tracks.findIndex((track) => {
            return track.name == trackName;
        });
        if(trackIndex == -1) {
            return;
        }
        this._artists[artistIndex].tracks.splice(trackIndex, 1);
        if (this._artists[artistIndex].tracks.length == 0) {
            this._artists.splice(artistIndex, 1);
        }
    }
}