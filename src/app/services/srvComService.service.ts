import { Injectable, Optional } from '@angular/core';
import { Http, Request } from '@angular/http';
import { DownloadTracksRoute } from '../Types/routes/downloadTracks';
import { String } from "../Common/Extensions/stringExtensions";

import { Route } from '../Types/routes/route';
import { ServerArtist } from '../Types/server-artist';
import { TopTracksRoute } from '../Types/routes/topTracks';
import { GetVideoIdRoute } from '../Types/routes/getVideoId';
import { Artist } from '../Types/artist';

@Injectable()
export class SrvComService {
    constructor( @Optional() private _http: Http) { }

    private _serverUrl: string = 'http://localhost:5555';

    public getTopTracks(artistName: string, numOfTracks: number): Promise<ServerArtist> {
        return new Promise((resolve, reject) => {
            if (!this.isTopTracksParamsValid) {
                reject("bad parameters");
            }
            else {
                this.buildRequestUrl(new TopTracksRoute(artistName, numOfTracks))
                    .then((requestUrl) => {
                        this._http.get(requestUrl).subscribe(value => resolve(JSON.parse(value["_body"])));
                    });
            }
        });
    }

    public getVideoId(artistName: string, trackName: string,
        withLyrics: boolean, resultNum: number = 0): Promise<string> {
        
        return new Promise((resolve, reject) => {
            this.buildRequestUrl(new GetVideoIdRoute(artistName, trackName, withLyrics, resultNum))
                .then((requestUrl) => {
                    this._http.get(requestUrl).subscribe((res) => {
                        resolve(res["_body"]);
                    })
                }).catch(err => reject(err));
        });
    }

    public downloadTracks(artist: Artist): Promise<Artist> {
        // let serverArtist: ServerArtist = {
        //     name: artist.name,
        //     tracks: artist.tracks.map(track => track.name),
        //     withLyrics: artist.withLyrics,
        // }
        return new Promise((resolve, reject) => {
            this.buildRequestUrl(new DownloadTracksRoute())
                .then((requestUrl) => {
                    this._http.post(requestUrl, artist).subscribe((val) => {
                        console.log(val);
                        resolve(artist);
                    });
                })
        });
    }

    private isTopTracksParamsValid(artistName: string, numOfTracks: number): boolean {
        return artistName != "" && numOfTracks > 0;
    }

    private buildRequestUrl(route: Route): Promise<string> {
        return new Promise((resolve, reject) => {
            if (route.params != null) {
                this.buildQueryParams(route.params).then((queryParams) => {
                    resolve(`${this._serverUrl}/${route.url}?${queryParams}`);
                });
            }
            else {
                resolve(`${this._serverUrl}/${route.url}`);
            }
        });
    }

    private buildQueryParams(params: any): Promise<string> {
        return new Promise((resolve, reject) => {
            let queryParams = Object.keys(params)
                .map((key) => `${params[key].name}=${params[key].value}`).join('&');
            resolve(`${queryParams}`);
        });
    }
}