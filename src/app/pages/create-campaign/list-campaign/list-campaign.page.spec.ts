import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCampaignPage } from './list-campaign.page';

describe('ListCampaignPage', () => {
  let component: ListCampaignPage;
  let fixture: ComponentFixture<ListCampaignPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListCampaignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
