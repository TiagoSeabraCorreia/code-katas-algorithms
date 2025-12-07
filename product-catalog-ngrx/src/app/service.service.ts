import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Product } from "./product.model";
import { of } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class Service  {
    constructor(private readonly http: HttpClient) {
    
    }
    
    getProducts(){
        return of([
            {
                id: 'A',
                name: 'P1'
            },
            {
                id: 'B',
                name: 'P2'
            }
        ] as Product[]);
    }
}