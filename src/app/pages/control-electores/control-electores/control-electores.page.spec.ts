import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlElectoresPage } from './control-electores.page';

describe('ControlElectoresPage', () => {
  let component: ControlElectoresPage;
  let fixture: ComponentFixture<ControlElectoresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ControlElectoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
