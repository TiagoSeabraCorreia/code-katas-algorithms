import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ServiceTypeService } from "./service-type.service";
import { loadedServiceTypesSuccess, loadServiceTypes } from "./actions";
import { map, switchMap } from "rxjs";


@Injectable()
export class ServiceTypeEffects {
  loadServiceTypes$;
  load$;

  constructor(
    private actions$: Actions,
    private api: ServiceTypeService
  ) {   
      this.load$ = this.actions$.pipe(
          ofType(loadServiceTypes),
          switchMap(() =>
          this.api.getAll().pipe(
              map(serviceTypes => loadedServiceTypesSuccess({ serviceTypes }))
          )
      ));

      this.loadServiceTypes$ = createEffect(() => this.load$);
  }
}
