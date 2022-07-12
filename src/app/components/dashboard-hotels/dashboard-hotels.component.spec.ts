import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHotelsComponent } from './dashboard-hotels.component';

describe('DashboardHotelsComponent', () => {
  let component: DashboardHotelsComponent;
  let fixture: ComponentFixture<DashboardHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardHotelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
