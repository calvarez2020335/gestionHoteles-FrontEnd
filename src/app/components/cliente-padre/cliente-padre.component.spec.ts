import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePadreComponent } from './cliente-padre.component';

describe('ClientePadreComponent', () => {
  let component: ClientePadreComponent;
  let fixture: ComponentFixture<ClientePadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientePadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientePadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
