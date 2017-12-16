import { Pipe, PipeTransform } from '@angular/core';
import { Track } from '../Types/track';

@Pipe({
    name: 'trackFilter',
    pure: false
})
export class TrackFilterPipe implements PipeTransform {
    transform(tracks: Array<Track>, searchQuery: string) {
        if (searchQuery == "" || searchQuery == undefined) {
            return tracks;
        }
        
        return tracks.filter(track => this._formatString(track.name)
            .includes(this._formatString(searchQuery)));
    }

    private _formatString(str: string): string {
        return str.toLowerCase().trim();
    }
}