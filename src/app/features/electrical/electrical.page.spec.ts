import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElectricalPage } from './electrical.page';

describe('ElectricalPage', () => {
  let component: ElectricalPage;
  let fixture: ComponentFixture<ElectricalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
