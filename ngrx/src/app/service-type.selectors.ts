import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ServiceTypeState } from "./service-type.reducer";
import { ServiceType } from "./service-type.model";

export const selectServiceTypeState = createFeatureSelector<ServiceTypeState>('serviceTypes');

export const selectServiceTypes = createSelector(selectServiceTypeState,
    state => state.serviceTypes
);

export const selectSelectedId = createSelector(selectServiceTypeState,
    state => state.selectedId
);

export const selectSelectedServiceType = createSelector(
    selectServiceTypes,
    selectSelectedId,
    (types: ServiceType[], id: string | null) => types.find( (t: ServiceType) => t.id === id ) ?? null
);
