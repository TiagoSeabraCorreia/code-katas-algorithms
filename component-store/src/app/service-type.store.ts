import { Injectable } from "@angular/core";
import { ComponentStore } from '@ngrx/component-store';
import { ServiceTypeService } from "./service-types.service";
import { switchMap, tap } from "rxjs";

export interface ServiceTypeState {
    serviceTypes: ServiceType[];
    loading: boolean;
    selectedId: string | null;
}

export interface ServiceType{
    id: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})

export class ServiceTypeStore extends ComponentStore<ServiceTypeState> {
    constructor(
        private readonly service: ServiceTypeService
    ) {
        super({
            loading: false,
            selectedId: null,
            serviceTypes: []
        })
    }

    //SELECTORS
    readonly serviceTypes$ = this.select(s => s.serviceTypes);
    readonly selectedId$ = this.select(s => s.selectedId);

    readonly selectedServiceType$ = this.select(
        this.serviceTypes$,
        this.selectedId$,
        (types: ServiceType[], id: string | null) => types.find((item: ServiceType) => item.id == id) ?? null
    )

    readonly loading$ = this.select(s => s.loading);

    //Updaters
    readonly setTypes = this.updater<ServiceType[]>((state, serviceTypes) => ({
        ...state,
        serviceTypes,
        loading: false
    }));

    readonly setLoading = this.updater<boolean>((state, value) => ({
        ...state,
        loading: value
    }));

    readonly setSelectedId = this.updater<string | null>((state, value) => ({
        ...state,
        selectedId: value
    }));

    //Effects
    readonly loadServiceTypes = this.effect<void>(trigger$ => 
        trigger$.pipe(
            tap(() => this.setLoading(true)),
            switchMap(() => 
                this.service.getAll().pipe(
                    tap(serviceTypes => this.setTypes(serviceTypes))
                )
            )
        )
    )
}