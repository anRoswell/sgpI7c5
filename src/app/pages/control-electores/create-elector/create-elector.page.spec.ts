import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateElectorPage } from './create-elector.page';

describe('CreateElectorPage', () => {
  let component: CreateElectorPage;
  let fixture: ComponentFixture<CreateElectorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateElectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
