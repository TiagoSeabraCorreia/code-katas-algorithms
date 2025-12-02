import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Service, VideoData } from './service.service';
import { concatMap, filter, from, interval, map, merge, Observable, scan, startWith, switchMap, take, takeLast, tap, toArray, withLatestFrom } from 'rxjs';
import { AsyncPipe, JsonPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentFrame$;
  
  constructor(
    private readonly service: Service,
  ){
    const flattenedPackageData$ = this.service.packageData()
      .pipe(
        concatMap((data: VideoData[]) => from(data))
      );

    const steady$ = this.service.thirtyHertzData();

    const mergedData$ = merge(flattenedPackageData$, steady$);

    const arrivalBuffer$ = mergedData$.pipe(
      scan((buffer: VideoData[], item: VideoData) => {
      const newBuffer = [...buffer, item];
      newBuffer.sort((a, b) => a.frameTimestamp - b.frameTimestamp);
        return newBuffer;
      }, [] as VideoData[])
    );

    
    this.currentFrame$ = interval(33).pipe(
      withLatestFrom(arrivalBuffer$),
      map((value)=> value[1]),
      filter((value: VideoData[]) => value.length > 300),
      scan((state: PlaybackState, timeline: VideoData[]) => {
        if (state.buffer.length == 0){
          state.buffer = timeline.slice(0, 150);
          state.lastTimestampName = state.buffer[0].frameName;
          state.lastTimestamp = state.buffer[0].frameTimestamp;
        }
        else {
          const nextElement = state.buffer.shift() ?? null;

          if (nextElement){
            state.lastTimestamp = nextElement.frameTimestamp;
            state.lastTimestampName = nextElement.frameName;
            const newTimestamps = timeline
            .filter((val: VideoData, index: number) => val.frameTimestamp > (state?.lastTimestamp ?? 0))

            state.buffer = [...newTimestamps];
          }
        }

        return state;
      }, {lastTimestamp: null, buffer: [], lastTimestampName: null} as PlaybackState),
      filter((value: PlaybackState) => value.lastTimestampName != null),
      map((value: PlaybackState) => value.lastTimestampName)
    );
  }
}

interface PlaybackState{
  lastTimestamp: number | null;
  buffer: VideoData[];
  lastTimestampName: string | null;
}
