import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCreationFormComponent } from './ticket-creation-form.component';

describe('TicketCreationFormComponent', () => {
  let component: TicketCreationFormComponent;
  let fixture: ComponentFixture<TicketCreationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketCreationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
