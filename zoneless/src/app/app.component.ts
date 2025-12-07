import { Component, importProvidersFrom, inject, NgZone, signal } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, PreloadingStrategy, ResolveFn, Route, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  items = signal(['A', 'B']);

  update(id: number, newName: string){
    this.items.update(v=> v.map((value, index) => index == id ? newName : value));
  }

  activateRoute = inject(ActivatedRoute);
  id = this.activateRoute.snapshot.paramMap.get('id');
}
