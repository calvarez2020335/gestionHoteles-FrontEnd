import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPadreComponent } from './admin-padre.component';

describe('AdminPadreComponent', () => {
  let component: AdminPadreComponent;
  let fixture: ComponentFixture<AdminPadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
