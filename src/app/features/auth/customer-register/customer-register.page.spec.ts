import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerRegisterPage } from './customer-register.page';

describe('CustomerRegisterPage', () => {
  let component: CustomerRegisterPage;
  let fixture: ComponentFixture<CustomerRegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
