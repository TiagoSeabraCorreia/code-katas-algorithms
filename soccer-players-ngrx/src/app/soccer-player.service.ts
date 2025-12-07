import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { SoccerPlayer } from "./soccer-player.model";


@Injectable({
    providedIn: 'root'
})
export class SoccerPlayerService{
    constructor(
        private readonly http: HttpClient
    ) {

    }

    getAll(){
        return of([
            {
                id: 'A',
                name: 'Ronaldo SIIII'
            },
            {
                id: 'B',
                name: 'Messi'
            }
        ] as SoccerPlayer[]);
    }
}