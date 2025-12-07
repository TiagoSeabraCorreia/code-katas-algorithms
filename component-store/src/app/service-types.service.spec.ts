import { firstValueFrom } from "rxjs";
import { ServiceType } from "./service-type.store";
import { ServiceTypeService } from "./service-types.service";


describe('Service Types Service test suite', () => {
    const expected: ServiceType[] = [
        {
            id: 'A',
            name: 'S1'
        },
        {
            id: 'B',
            name: 'S2'
        }
    ];

    class MockHttpClient{

    }

    let mockHttp: MockHttpClient;

    beforeEach(()=>{
        mockHttp = new MockHttpClient();
    }) 

    it('should load serviceTypes', async () => {
        const sut = new ServiceTypeService(mockHttp as any);

        const actual = await firstValueFrom(sut.getAll());

        expect(actual).toEqual(expected);
    });
});