import { createAction, props } from "@ngrx/store";
import { SoccerPlayer } from "./soccer-player.model";

const prefix = '[Soccer Players]:';
export const loadSoccerPlayers = createAction(prefix + 'Load Soccer Players');

export const loadSoccerPlayersSuccess = createAction(prefix + 'Load Soccer Players Success',
    props<{players: SoccerPlayer[]}>()
);

export const changeSelectedSoccerPlayer = createAction(prefix + 'Change Selected Soccer Player',
    props<{id: string}>()
);