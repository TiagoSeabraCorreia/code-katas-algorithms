import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "./product.model";
import { ProductState } from "./product.reducer";


export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(selectProductState,
    state => state.products
)

export const selectSelectedId = createSelector(selectProductState,
    state => state.selectedId
);

export const selectSelectedProduct = createSelector(selectProducts, 
    selectSelectedId,
    (products: Product[], id: string | null) => products.find(it => it.id == id) ?? null  
);
