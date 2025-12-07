import { Injectable } from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import { switchMap, tap } from "rxjs";
import { ProductService } from "./service.service";

@Injectable({
    providedIn: 'root'
})
export class ProductStore extends ComponentStore<InitialState> {
    constructor(
        private readonly service: ProductService
    ) {
        super({
            loading: false,
            products: [],
            selectedId: null
        });
    }

    readonly selectedId$ = this.select((val: InitialState) => val.selectedId );
    readonly isLoading$ = this.select((val: InitialState) => val.loading );
    readonly products$ = this.select((val: InitialState) => val.products );
    readonly selectedProduct$ = this.select(
        this.selectedId$,
        this.products$,
        (selectedId, products) => products.find(it => it.id == selectedId ) ?? null
    );

    readonly setSelectedId = this.updater<string | null>((state, id: string|null) => ({
        ...state,
        selectedId: id
    }))


    readonly loadProducts = this.effect(origin$ => origin$.pipe(
            tap(() => this.patchState({loading: true})),
            switchMap( () => this.service.getProducts().pipe(
                tap({
                    next: (products: Product[]) => {
                        this.patchState({products: products, loading: false})
                    },
                    error: () => this.patchState({loading: false})
                })
            ))

        )
    )
}

export interface InitialState{
    loading: boolean;
    selectedId: string | null;
    products: Product[];
}

export interface Product{
    id: string;
    name: string;
}