import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnicianLoginPage } from './technician-login.page';

describe('TechnicianLoginPage', () => {
  let component: TechnicianLoginPage;
  let fixture: ComponentFixture<TechnicianLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
