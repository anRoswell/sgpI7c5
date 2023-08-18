import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewSeguimientoPage } from './new-seguimiento.page';

describe('NewSeguimientoPage', () => {
  let component: NewSeguimientoPage;
  let fixture: ComponentFixture<NewSeguimientoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewSeguimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
