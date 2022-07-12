import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacionesClienteComponent } from './habitaciones-cliente.component';

describe('HabitacionesClienteComponent', () => {
  let component: HabitacionesClienteComponent;
  let fixture: ComponentFixture<HabitacionesClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitacionesClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitacionesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
