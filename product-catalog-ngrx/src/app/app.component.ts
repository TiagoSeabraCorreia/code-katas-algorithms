import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectProducts, selectSelectedProduct } from './product.selectors';
import { loadProducts, selectProduct } from './product.actions';
import { AsyncPipe, CommonModule } from '@angular/common';
import { pipe, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  store = inject(Store);
  products$;
  selectedProduct$;

  constructor(){
    this.store.dispatch(loadProducts());
    this.products$ = this.store.select(selectProducts).pipe(
      tap(console.log)
    );
    this.selectedProduct$ = this.store.select(selectSelectedProduct);
  }

  selectProduct(id: string){
    this.store.dispatch(selectProduct({id}));
  }
}
