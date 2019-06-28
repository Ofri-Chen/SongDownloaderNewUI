import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Track } from '../Types/track';

@Component({
  selector: 'tracks-displayer',
  templateUrl: './tracks-displayer.component.html',
  styleUrls: ['./tracks-displayer.component.css']
})
export class TracksDisplayerComponent implements OnInit {
  @Output() onPrevVideoClick = new EventEmitter<Track>();
  @Output() onPlayVideoClick = new EventEmitter<Track>();
  @Output() onNextVideoClick = new EventEmitter<Track>();
  @Output() onRemoveTrackClick = new EventEmitter<string>();

  @Input() tracks: Track[];
  @Input() currentPlayingTrack: Track;

  constructor() { }

  ngOnInit() {
  }

  public prevVideo(track: Track) {
    this.onPrevVideoClick.emit(track);
  }

  public playVideo(track: Track) {
    this.onPlayVideoClick.emit(track);
  }

  public nextVideo(track: Track) {
    this.onNextVideoClick.emit(track);
  }

  public removeTrack(trackName: string) {
    this.onRemoveTrackClick.emit(trackName);
  }

  public getTrackStyle(track: Track) {
    return this.currentPlayingTrack && track.name === this.currentPlayingTrack.name
      ? { 'background-color': 'rgba(160, 0, 181, 0.5)' }
      : { 'background-color': 'rgb(136, 105, 217, 0.5)' }
  }
}
