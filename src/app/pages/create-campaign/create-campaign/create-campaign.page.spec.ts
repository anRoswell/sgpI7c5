import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCampaignPage } from './create-campaign.page';

describe('CreateCampaignPage', () => {
  let component: CreateCampaignPage;
  let fixture: ComponentFixture<CreateCampaignPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateCampaignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
