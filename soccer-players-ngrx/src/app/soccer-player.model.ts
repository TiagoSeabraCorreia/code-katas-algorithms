export interface SoccerPlayer{
    id: string;
    name: string;
}

export interface SoccerStoreState{
    selectedId: string | null;
    players: SoccerPlayer[];
}