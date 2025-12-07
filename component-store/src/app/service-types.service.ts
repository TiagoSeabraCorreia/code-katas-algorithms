import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { ServiceType } from "./service-type.store";


@Injectable({
    providedIn: 'root'
})
export class ServiceTypeService {
    constructor(private readonly httpClient: HttpClient) {
        
    }

    getAll(){
        return of<ServiceType[]>([
            {
                id: 'A',
                name: 'S1'
            },
            {
                id: 'B',
                name: 'S2'
            }
        ]);
    }
}