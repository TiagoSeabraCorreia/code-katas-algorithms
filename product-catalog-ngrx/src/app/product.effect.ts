import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Service } from "./service.service";
import { loadProducts, loadProductsSuccess } from "./product.actions";
import { map, switchMap, tap } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class ProductEffect{
    readonly loadProducts$

    constructor(
        private readonly actions$: Actions,
        private readonly service: Service
    ){
        this.loadProducts$ = createEffect(() => this.actions$.pipe(
            ofType(loadProducts),
            switchMap(() => 
                this.service.getProducts()
                    .pipe(
                        map((products) => loadProductsSuccess({products}))
                    )
            )
        ))
    }
}