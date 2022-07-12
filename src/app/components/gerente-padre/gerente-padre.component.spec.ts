import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerentePadreComponent } from './gerente-padre.component';

describe('GerentePadreComponent', () => {
  let component: GerentePadreComponent;
  let fixture: ComponentFixture<GerentePadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerentePadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerentePadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
