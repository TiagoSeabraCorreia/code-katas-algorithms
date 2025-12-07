import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SoccerPlayerService } from "./soccer-player.service";
import { map, of, switchMap, tap } from "rxjs";
import { loadSoccerPlayers, loadSoccerPlayersSuccess } from "./soccer-player.actions";
import { SoccerPlayer } from "./soccer-player.model";


@Injectable({
    providedIn: 'root'
})
export class SoccerPlayerEffects {
    
    loadPlayers$;
    
    constructor(
        private readonly service: SoccerPlayerService,
        private readonly actions$: Actions
    ) {
        this.loadPlayers$ = createEffect(() => this.actions$.pipe(
            ofType(loadSoccerPlayers),
            switchMap(() => 
                this.service.getAll().pipe(
                    map((players: SoccerPlayer[]) => loadSoccerPlayersSuccess({players}))
                )
            )
        ))
    }
}