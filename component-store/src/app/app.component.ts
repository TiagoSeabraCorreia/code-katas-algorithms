import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceTypeStore } from './service-type.store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  loading$;
  serviceTypes$;
  selectedServiceType$;

  constructor(
    private readonly serviceStore: ServiceTypeStore
  ){
    this.loading$ = this.serviceStore.loading$;
    this.serviceTypes$ = this.serviceStore.serviceTypes$;
    this.selectedServiceType$ = this.serviceStore.selectedServiceType$;
    
    this.serviceStore.loadServiceTypes();
  }

  select(arg0: string) {
    this.serviceStore.setSelectedId(arg0);
  }
}
