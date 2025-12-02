import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Service, VideoData } from './service.service';
import { concatMap, filter, from, interval, map, merge, Observable, scan, startWith, switchMap, take, takeLast, tap, toArray, withLatestFrom } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentFrame$: Observable<string>;

  constructor(
    private readonly service: Service
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

        return newBuffer.slice(-150);
      }, [] as VideoData[])
    );

    const playbackBuffer$ = arrivalBuffer$.pipe(
      map((buffer: VideoData[]) => buffer.slice(0, 150)),           
    );

    this.currentFrame$ = playbackBuffer$.pipe(
      startWith([] as VideoData[]),
      withLatestFrom(interval(33)),
      scan((state, [buffer]) => {

    const lastTs = state.lastTimestamp;

    const newFrames = buffer.filter(f => f.frameTimestamp > lastTs);

    if (newFrames.length > 0) {
      state.buffer.push(...newFrames);
      state.lastTimestamp = newFrames[newFrames.length - 1].frameTimestamp;
    }

    // consume next frame
    const next = state.buffer.shift() ?? null;

    return {
      lastTimestamp: state.lastTimestamp,
      buffer: state.buffer,
      frame: next
    };
  }, { lastTimestamp: -Infinity, buffer: [] as VideoData[], frame: null } as { lastTimestamp: number, buffer: VideoData[], frame: VideoData | null}),
    filter(s => s.frame !== null),
    map(s => s.frame!.frameName)
  );

  }
}
