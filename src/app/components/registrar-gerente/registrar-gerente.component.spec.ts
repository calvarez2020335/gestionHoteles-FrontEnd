import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarGerenteComponent } from './registrar-gerente.component';

describe('RegistrarGerenteComponent', () => {
  let component: RegistrarGerenteComponent;
  let fixture: ComponentFixture<RegistrarGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarGerenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
