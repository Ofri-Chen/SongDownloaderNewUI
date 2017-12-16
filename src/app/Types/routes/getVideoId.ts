import { Route } from "./route";
import { QueryParam } from './queryParam';

export class GetVideoIdRoute implements Route {
    public url: string = 'getVideoId';
    public params: GetVideoIdParams;
    public constructor(artistName: string, trackName: string, withLyrics: boolean, resultNum: number) {
        this.params = new GetVideoIdParams(artistName, trackName, withLyrics, resultNum);
    }
}

export class GetVideoIdParams {
    searchQuery: QueryParam;
    withLyrics: QueryParam;
    trackName: QueryParam;
    resultNum: QueryParam;

    constructor(artistName: string, trackName: string, withLyrics: boolean, resultNum: number) {
        this.searchQuery = new QueryParam("artistName", artistName);
        this.trackName = new QueryParam("trackName", trackName);        
        this.withLyrics = new QueryParam("withLyrics", withLyrics);
        this.resultNum = new QueryParam("resultNum", resultNum);
    }
}