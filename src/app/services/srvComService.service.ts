import { Injectable, Optional } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import { DownloadTracksRoute } from '../Types/routes/downloadTracks';
import { map } from 'rxjs/operators';

import { Route } from '../Types/routes/route';
import { ServerArtist } from '../Types/server-artist';
import { TopTracksRoute } from '../Types/routes/topTracks';
import { GetVideoIdRoute } from '../Types/routes/getVideoId';
import { Artist } from '../Types/artist';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SrvComService {
    constructor(private _http: Http) { }

    private _serverUrl = 'http://localhost:5555';

    public async getTopTracks(artistName: string, numOfTracks: number): Promise<ServerArtist> {
        if (!this.isTopTracksParamsValid(artistName, numOfTracks)) {
            throw new Error('bad parameters');
        }
        const requestUri = await this.buildRequestUri(new TopTracksRoute(artistName, numOfTracks));
        return this.parseResponse<ServerArtist>(this._http.get(requestUri));
    }

    public getVideoId(artistName: string, trackName: string, withLyrics: boolean, resultNum: number = 0): Promise<string> {
        const requestUri = this.buildRequestUri(new GetVideoIdRoute(artistName, trackName, withLyrics, resultNum));
        return this.parseResponse(this._http.get(requestUri));
    }

    public downloadTracks(artist: Artist): Promise<Artist> {
        const requestUri = this.buildRequestUri(new DownloadTracksRoute());
        return this.parseResponse(this._http.post(requestUri, artist));
    }

    private parseResponse<T>(response: Observable<Response>): Promise<T> {
        return response.pipe(map(value => JSON.parse(value['_body']))).toPromise()
    }

    private isTopTracksParamsValid(artistName: string, numOfTracks: number): boolean {
        return artistName !== '' && numOfTracks > 0;
    }

    private buildRequestUri(route: Route): string {
        return `${this._serverUrl}/${route.url}?${this.buildQueryParams(route.params)}`;
    }

    private buildQueryParams(params: any): string {
        return Object.keys(params || {})
            .map((key) => `${params[key].name}=${params[key].value}`).join('&');
    }
}
