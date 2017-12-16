import { Track } from "./track";

export interface Artist {
    name: string;
    tracks: Track[];
    withLyrics?: boolean;
}