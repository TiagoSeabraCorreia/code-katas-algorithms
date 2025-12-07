import { createAction, props } from "@ngrx/store";
import { Product } from "./product.model";

const prefix = "[Products]";
export const loadProducts = createAction(`${prefix} Load Products`);

export const loadProductsSuccess = createAction(prefix + " Load Products Success",
    props<{products: Product[]}>()
);

export const selectProduct = createAction(prefix + " Select Product", props<{id: string}>())