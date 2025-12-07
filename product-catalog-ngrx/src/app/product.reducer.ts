import { createReducer, on } from "@ngrx/store";
import { Product } from "./product.model";
import { loadProductsSuccess, selectProduct } from "./product.actions";

export interface ProductState{
    products: Product[];
    selectedId: string | null;
}

const initialState: ProductState = {
    products: [] as Product[],
    selectedId: null
}

export const productReducer = createReducer(
    initialState,

    on(loadProductsSuccess, (state, {products}) => ({
        ...state,
        products
    })),
    on(selectProduct, (state, {id}) => ({
        ...state,
        selectedId: id
    }))
)

