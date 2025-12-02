import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Log, Service } from './service.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { combineLatest, distinctUntilChanged, EMPTY, filter, from, map, merge, mergeMap, of, sampleTime, scan, shareReplay, takeLast, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  ui$;
  tenSeconds = 10000;
  fiveSeconds = 5000;

  constructor(private readonly api: Service) {
    const burst$ = this.api.getBurstData().pipe(
      mergeMap((batch: Log[]) => from(batch))
    );

    const dataAt20Hz$ = this.api.get20hzData();
    const mergeData$ = merge(dataAt20Hz$, burst$)
    const latest$ = mergeData$.pipe(shareReplay(1));
    
    const latest10SecondsBuffer$ = mergeData$.pipe(
      scan((acc: Log[], item: Log) => {
        const now = item.timestamp;

        const updated = [...acc, item];

        return updated.filter((log: Log) => log.timestamp >= now-this.tenSeconds);
      }, [] as Log[])
    );

    const latest5SecondBuffer$ = mergeData$.pipe(
      scan((acc: Log[], item: Log) => {
        const now = item.timestamp;

        const updated = [...acc, item];

        return updated.filter((log: Log) => log.timestamp >= now-this.fiveSeconds);
      }, [] as Log[])
    );

    const average10SecondLoad$ = latest10SecondsBuffer$.pipe(
      map((bufferOf10Seconds: Log[]) => {
        const length = bufferOf10Seconds.length;
        let sum = 0;
        
        bufferOf10Seconds.forEach((item: Log) => sum+= item.load);

        return sum == 0 ? sum : sum/length;
      })
    );

    const average5SecondLoad$ = latest5SecondBuffer$.pipe(
      map((bufferOf5Seconds: Log[]) => {
        const length = bufferOf5Seconds.length;
        let sum = bufferOf5Seconds.reduce((currentSum: number, currentItem: Log) => currentSum + currentItem.load,0);

        return sum == 0 ? sum : sum/length;
      })
    );

    const anomalyDetection$ = combineLatest([average10SecondLoad$, average5SecondLoad$]).pipe(
      map(([load10Secs, load5Secs]) => load10Secs * 1.5 < load5Secs),
      distinctUntilChanged()
    );

    this.ui$ = combineLatest([latest$, average10SecondLoad$, anomalyDetection$]).pipe(
      sampleTime(200),
      shareReplay(1)
    );
  }
}
