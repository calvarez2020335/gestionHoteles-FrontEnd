import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelesUsuarioComponent } from './hoteles-usuario.component';

describe('HotelesUsuarioComponent', () => {
  let component: HotelesUsuarioComponent;
  let fixture: ComponentFixture<HotelesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelesUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
