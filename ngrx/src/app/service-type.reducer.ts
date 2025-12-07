import { createReducer, on } from "@ngrx/store";
import { loadedServiceTypesSuccess, selectServiceType } from "./actions";
import { ServiceType } from "./service-type.model";
//Represents the state of the store
export interface ServiceTypeState{
    serviceTypes: ServiceType[];
    selectedId: string | null;
}

export const initialState: ServiceTypeState = {
    serviceTypes: [],
    selectedId: null
};

export const serviceTypesReducer = createReducer(initialState,
    on(loadedServiceTypesSuccess, (state, {serviceTypes}) => ({
        ...state,
        serviceTypes
    })),

    on(selectServiceType, (state, {id}) => ({
        ...state,
        selectedId: id
    }))
);