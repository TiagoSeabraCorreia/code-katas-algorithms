import { HttpClient } from "@angular/common/http";
import { Product } from "./product.store";
import { of } from "rxjs";



export class ProductService {
    constructor(
        private readonly client: HttpClient
    ) {

    }

    getProducts(){
        return of([
            { id: 'A', name: 'Product 1' },
            { id: 'B', name: 'Product 2'}
        ] as Product[])
    }
}