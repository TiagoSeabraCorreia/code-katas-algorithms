import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceType } from "./service-type.model";
import { of } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ServiceTypeService{
    constructor(private http: HttpClient){

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