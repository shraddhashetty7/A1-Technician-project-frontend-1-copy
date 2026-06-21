import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignedJobsPage } from './assigned-jobs.page';

describe('AssignedJobsPage', () => {
  let component: AssignedJobsPage;
  let fixture: ComponentFixture<AssignedJobsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
