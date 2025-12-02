import { Injectable } from "@angular/core";
import { registerAppScopedDispatcher } from "@angular/core/primitives/event-dispatch";
import { defer, interval, map, of, repeat, switchMap, timer } from "rxjs";


@Injectable({
    providedIn: "root"
})
export class Service{
    private globalFrameCounter = 1;

    thirtyHertzData(){
        return interval(33).pipe(
            map(() => {
                return {
                    frameName: ("" + this.globalFrameCounter).padStart(5, "0"),
                    frameTimestamp: this.globalFrameCounter++,
                } as VideoData
            })
        )
    }

    packageData(){
        return defer(()=> of(null)).pipe(
            switchMap(() => timer(2000)),
            map(() => {
                const size = this.getRandomPackageSize();

                const frames: VideoData[] = [];
                for (let i = 0; i < size; i++) {
                    const frameName = ("" + this.globalFrameCounter).padStart(5, "0");
                    frames.push({
                        frameName: frameName,
                        frameTimestamp: this.globalFrameCounter++
                    });
                }                
 
                return frames; 
            }),
            repeat()
        )
    }

    //get reandom package size from 5 to 40 frames
    getRandomPackageSize(){
        return 5 + Math.floor(Math.random() * 36);
    }

    //get random wait until next package emition 1-4 seconds
    getDelay(){
        return 1 + Math.floor(Math.random() * 4)
    }
}

export interface VideoData{
    frameTimestamp: number;
    frameName: string;
}