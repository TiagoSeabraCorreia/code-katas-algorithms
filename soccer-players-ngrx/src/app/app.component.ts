import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { changeSelectedSoccerPlayer, loadSoccerPlayers } from './soccer-player.actions';
import { selectSelectedSoccerPlayer, selectSoccerPlayers } from './soccer-player.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'soccer-players-ngrx';
  store = inject(Store);
  soccerPlayers$;
  selectedSoccerPlayer$;

  constructor(){
    this.store.dispatch(loadSoccerPlayers());
    this.soccerPlayers$ = this.store.select(selectSoccerPlayers);
    this.selectedSoccerPlayer$ = this.store.select(selectSelectedSoccerPlayer);
  } 

  selectPlayer(id: string) {
    this.store.dispatch(changeSelectedSoccerPlayer({id}));
  }

}
