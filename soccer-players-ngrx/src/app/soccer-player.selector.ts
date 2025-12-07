import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SoccerPlayer, SoccerStoreState } from "./soccer-player.model";

export const selectSoccerPlayerState = createFeatureSelector<SoccerStoreState>('soccerPlayer');

export const selectSoccerPlayers = createSelector(selectSoccerPlayerState,
    (state) => state.players
);

export const selectSelectedSoccerPlayerId = createSelector(selectSoccerPlayerState, 
    state => state.selectedId
);

export const selectSelectedSoccerPlayer = createSelector(
    selectSoccerPlayers,
    selectSelectedSoccerPlayerId,
    (players: SoccerPlayer[], id: string | null) => players.find(it => it.id == id) ?? null
);