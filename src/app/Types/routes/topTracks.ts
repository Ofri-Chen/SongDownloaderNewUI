import { Route } from "./route";
import { QueryParam } from "./queryParam";

export class TopTracksRoute implements Route {
    public url: string = 'topTracks';
    public params: TopTracksParams;
    constructor(artistName: string, numOfTracks: number){        
        this.params = new TopTracksParams(artistName, numOfTracks);
    }
}

export class TopTracksParams {
    artistName: QueryParam;
    numOfTracks: QueryParam;
    constructor(artistName: string, numOfTracks: number) {
        this.artistName = new QueryParam("artistName", artistName);
        this.numOfTracks = new QueryParam("numOfTracks", numOfTracks);
    }
}