import { Route } from "./route";

export class TopTracksRoute implements Route {
    public url: string = 'TopTracks';
    constructor(public params: TopTracksParams){        
    }
}

export interface TopTracksParams {
    artistName: string;
    numOfTracks: number;
}