import { firstValueFrom, of } from "rxjs";
import { ServiceType, ServiceTypeState, ServiceTypeStore } from "./service-type.store";
import { ServiceTypeService } from "./service-types.service";
import { fakeAsync, tick } from "@angular/core/testing";

describe('Service Type Store test suite', () => {
    const expected: ServiceType[] = [
        { id: 'A', name: 'S1' },
        { id:'B', name: 'S2'}
    ];

    let store: ServiceTypeStore;
    let service;

    class MockServiceTypeService{
        getAll(){
            return of(expected);
        }
    }

    beforeEach(() => {
        service = new MockServiceTypeService();
        store = new ServiceTypeStore(service as any);
    })

    it('initial state is correct', async () => {
        const expectedId = null;
        const expectedServiceTypes: ServiceType[] = [];
        const expectedLoading = false;

        const actualId = await firstValueFrom(store.selectedId$);
        const actualLoading = await firstValueFrom(store.loading$);
        const actualServiceTypes = await firstValueFrom(store.serviceTypes$);

        const actual: ServiceTypeState = {
            loading: actualLoading,
            selectedId: actualId,
            serviceTypes: actualServiceTypes
        }

        const expected: ServiceTypeState = {
            loading: expectedLoading,
            selectedId: expectedId,
            serviceTypes: expectedServiceTypes
        };

        expect(actual).toEqual(expected);
    });

    it('should load the correct serviceTypes', fakeAsync( async () => {
        store.loadServiceTypes();
        tick(400);
        const actual = await firstValueFrom(store.serviceTypes$);

        expect(actual).toEqual(expected);
    }));

    it('should match id after changing',fakeAsync(async () => {
        store.setSelectedId(expected[0].id);
        tick(400)
        const actual = await firstValueFrom(store.selectedId$);
        expect(actual).toEqual(expected[0].id);
    }));

    it('should match the correct object after changing', async () => {
        store.loadServiceTypes();
        store.setSelectedId(expected[0].id);
        const actual = await firstValueFrom(store.selectedServiceType$);
        
        expect(actual).toEqual(expected[0]);
    });

    it('should return null when there is no with the given id', async () => {
        store.loadServiceTypes();
        store.setSelectedId('KKL');
        const actual = await firstValueFrom(store.selectedServiceType$);
        
        expect(actual).toBeNull();
    });
})