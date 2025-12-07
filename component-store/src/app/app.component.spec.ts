import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiceType, ServiceTypeStore } from './service-type.store';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';

describe('AppComponent', () => {
  const expectedServiceTypes =[
    {
        id: 'A',
        name: 'S1'
    },
    {
        id: 'B',
        name: 'S2'
    }
  ];

  const mockLoadingSubject = new BehaviorSubject(false);
  class MockServiceTypeStore {
    selectedIdSubject = new BehaviorSubject<string | null>(null);
    selectedId$ = this.selectedIdSubject.asObservable();
    serviceTypesSubject = new BehaviorSubject<ServiceType[]>([]);
    serviceTypes$ = this.serviceTypesSubject.asObservable();
    selectedServiceTypeSubject = new BehaviorSubject<ServiceType | null>(null);
    selectedServiceType$ = this.selectedServiceTypeSubject.asObservable();
    loadingSubject = mockLoadingSubject;
    loading$ = this.loadingSubject.asObservable();

    loadServiceTypes(){
      this.serviceTypesSubject.next([
          {
              id: 'A',
              name: 'S1'
          },
          {
              id: 'B',
              name: 'S2'
          }]);
      this.loadingSubject.next(false);
    }

    setSelectedId(id: string) {
      this.selectedIdSubject.next(id);
      const selectedServiceType: ServiceType | null = this.serviceTypesSubject.value.find(item => item.id == id) ?? null;
      this.selectedServiceTypeSubject.next(selectedServiceType);
    }
  }

  let store: MockServiceTypeStore;
  beforeEach(async () => {
    store = new MockServiceTypeStore();

    await TestBed.configureTestingModule({
      providers: [{useValue: store, provide: ServiceTypeStore}],
      imports: [AppComponent, HttpClientTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should swap selected id',async() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.select('A');
    const selectedId = await firstValueFrom(store.selectedId$);
    expect(selectedId).toBe('A');
  });

  it('should load service types',async() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const actual = await firstValueFrom(app.serviceTypes$);
    expect(actual).toEqual(expectedServiceTypes);
  });

  it('should have a ul with 2 li',async() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const ul = fixture.elementRef.nativeElement.querySelector('ul');
    expect(ul).toBeTruthy();
    const li = ul.querySelectorAll('li') as NodeList;
    expect(li.length).toBe(expectedServiceTypes.length);
    li.forEach((item, index) => expect(item.textContent?.trim()).toEqual(expectedServiceTypes[index].name))
  });

  it('should render loading...', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    mockLoadingSubject.next(true);
    fixture.detectChanges();
    let loadingh1: Node = fixture.elementRef.nativeElement.querySelector('#loading');
    expect(loadingh1.textContent).toBe('loading...');
    mockLoadingSubject.next(false);
    fixture.detectChanges();
    loadingh1 = fixture.elementRef.nativeElement.querySelector('#loading');
    expect(loadingh1).toBeNull();
  });

  it('should swap selected on click', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    let selectedSpan: Node= fixture.nativeElement.querySelector('#selected');
    expect(selectedSpan.textContent?.trim()).not.toBe(expectedServiceTypes[0].name);
    fixture.detectChanges();  
    const ul = fixture.nativeElement.querySelector('ul');  
    let li = ul.querySelectorAll('li') as NodeList;
    li[0].dispatchEvent(new MouseEvent('click'));
    fixture.detectChanges();
    const val = (await firstValueFrom(app.selectedServiceType$));
    selectedSpan = fixture.nativeElement.querySelector('#selected');
    expect(selectedSpan.textContent?.trim()).toBe(expectedServiceTypes[0].name);
  });
});
