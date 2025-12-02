import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { defer, interval, map, Observable, of, repeat, switchMap, timeInterval, timer } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class Service{
    constructor (
        private readonly http: HttpClient
    ){

    }

    get20hzData(): Observable<Log> {
        return interval(200).pipe(
            map(() => ({
                serviceId: '20hz',
                load: this.randomLoad(),
                timestamp: Date.now()
            }))
        );
    }

    randomBurstSize(): number {
        return 5 + Math.floor(Math.random() * 16); // 5–20
    }

    randomDelay(): number {
        return 3000 + Math.random() * 4000;
    }

    getBurstData(): Observable<Log[]> {
        return defer(() => of(null))
            .pipe(
                switchMap(() => timer(this.randomDelay())),
                map(() => {
                    const timestamp = Date.now();
                    const size = this.randomBurstSize();

                    return Array.from({ length: size }).map(() => ({
                        serviceId: 'burst',
                        load: this.randomLoad(),
                        timestamp,
                    }));
                }),
                repeat()
            );
}
    
    randomLoad(): number {
        const r = Math.random();

        if (r < 0.95) {
            return 10 + Math.floor(Math.random() * 30);
        }

        return 5000 + Math.floor(Math.random() * 5400);
    }
}

export interface Log{
    serviceId: string;
    timestamp: number;
    load: number;
}