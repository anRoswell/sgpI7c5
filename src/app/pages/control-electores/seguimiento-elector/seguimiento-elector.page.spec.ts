import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeguimientoElectorPage } from './seguimiento-elector.page';

describe('SeguimientoElectorPage', () => {
  let component: SeguimientoElectorPage;
  let fixture: ComponentFixture<SeguimientoElectorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SeguimientoElectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
