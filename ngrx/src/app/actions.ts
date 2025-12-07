import { createAction, props } from "@ngrx/store";
import { ServiceType } from "./service-type.model";

export const loadServiceTypes = createAction('[Service Types] Load Service Types');

export const loadedServiceTypesSuccess = createAction('[Service Types] Load Service Types Success', 
    props<{serviceTypes: ServiceType[]}>()
)

export const selectServiceType = createAction('[Service Types] Select Service Type', 
    props<{id: string}>()
)