import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelesSAdminComponent } from './hoteles-sadmin.component';

describe('HotelesSAdminComponent', () => {
  let component: HotelesSAdminComponent;
  let fixture: ComponentFixture<HotelesSAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelesSAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelesSAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
