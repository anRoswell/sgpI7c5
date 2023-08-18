import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalAsignPage } from './personal-asign.page';

describe('PersonalAsignPage', () => {
  let component: PersonalAsignPage;
  let fixture: ComponentFixture<PersonalAsignPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PersonalAsignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
