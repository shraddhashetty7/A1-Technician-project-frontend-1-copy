import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlumbingPage } from './plumbing.page';

describe('PlumbingPage', () => {
  let component: PlumbingPage;
  let fixture: ComponentFixture<PlumbingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlumbingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
