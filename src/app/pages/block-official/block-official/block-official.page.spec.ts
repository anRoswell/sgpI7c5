import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockOfficialPage } from './block-official.page';

describe('BlockOfficialPage', () => {
  let component: BlockOfficialPage;
  let fixture: ComponentFixture<BlockOfficialPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BlockOfficialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
