import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcPage } from './ac.page';

describe('AcPage', () => {
  let component: AcPage;
  let fixture: ComponentFixture<AcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
