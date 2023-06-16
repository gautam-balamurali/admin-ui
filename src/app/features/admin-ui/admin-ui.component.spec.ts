import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUiComponent } from './admin-ui.component';

describe('AdminUiComponent', () => {
  let component: AdminUiComponent;
  let fixture: ComponentFixture<AdminUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
