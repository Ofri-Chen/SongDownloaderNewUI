import { Injectable, Optional } from '@angular/core';
import { Artist } from '../Types/artist';
import { Http, Request } from '@angular/http';
import { Route } from '../Types/routes/route';
import { TopTracksRoute, TopTracksParams } from '../Types/routes/topTracks';
import { String} from "../Common/Extensions/stringExtensions";

@Injectable()
export class SrvComService {
    constructor(@Optional() private _http: Http){}

    private _serverUrl: string = 'http://localhost:5555';


    public getTopTracks(params: TopTracksParams): Promise<Artist> {
        return new Promise((resolve, reject) => {
            this.buildRequestUrl(new TopTracksRoute(params))
                .then((requestUrl) => {
                this._http.get(requestUrl).subscribe(value => resolve(JSON.parse(value["_body"])));
            });
        });
    }

    private isTopTracksParamsValid(params: TopTracksParams): boolean{
        return params.artistName != "" && params.numOfTracks > 0;
    }


    private buildRequestUrl(route: Route): Promise<string> {
        return new Promise((resolve, reject) => {
            this.buildQueryParams(route.params).then((queryParams) => {
                resolve(`${this._serverUrl}/${route.url}${queryParams}`);
            })
        })
    }

    private buildQueryParams(paramsObj: object): Promise<string> {
        return new Promise((resolve, reject) => {
            let queryParams = Object.keys(paramsObj)
                .map((key) => `${key}=${paramsObj[key]}`).join('&');
            resolve(`?${queryParams}`);
        });
    }
}