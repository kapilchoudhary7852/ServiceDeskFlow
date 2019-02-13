import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDeskCreateUpdateComponent } from './service-desk-create-update.component';

describe('ServiceDeskCreateUpdateComponent', () => {
  let component: ServiceDeskCreateUpdateComponent;
  let fixture: ComponentFixture<ServiceDeskCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDeskCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDeskCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
