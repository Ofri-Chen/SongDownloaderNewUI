import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trackFilter'
})
export class TrackFilterPipe implements PipeTransform {
    transform(tracks: Array<string>, searchQuery: string) {
        if (searchQuery == "" || searchQuery == undefined) {
            return tracks;
        }
        
        let a = tracks.filter(track => track.toLowerCase().includes(searchQuery.toLowerCase()));
        return a;
    }
}