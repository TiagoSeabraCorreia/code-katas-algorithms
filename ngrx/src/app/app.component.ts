import { Component, OnInit } from '@angular/core';
import { selectSelectedServiceType, selectServiceTypes } from './service-type.selectors';
import { Store } from '@ngrx/store';
import { loadServiceTypes, selectServiceType } from './actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  serviceTypes$;
  selectedType$;

  constructor(private readonly store: Store) {
    this.serviceTypes$ = this.store.select(selectServiceTypes);
    this.selectedType$ = this.store.select(selectSelectedServiceType);
  }

  ngOnInit() {
    this.store.dispatch(loadServiceTypes());
  }

  select(id: string) {
    this.store.dispatch(selectServiceType({ id }));
  }
}