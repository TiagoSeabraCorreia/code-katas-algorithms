import { createReducer, on } from "@ngrx/store";
import { SoccerStoreState } from "./soccer-player.model";
import { changeSelectedSoccerPlayer, loadSoccerPlayersSuccess } from "./soccer-player.actions";

const initialState: SoccerStoreState = {
    players: [],
    selectedId: null
}
export const soccerPlayerReducer = createReducer(
    initialState, 
    on(loadSoccerPlayersSuccess, (state, {players}) => ({
        ...state,
        players
    })),

    on(changeSelectedSoccerPlayer, (state, {id}) => ({
        ...state,
        selectedId: id
    })),
);