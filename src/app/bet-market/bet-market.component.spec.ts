import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetMarketComponent } from './bet-market.component';

describe('BetMarketComponent', () => {
  let component: BetMarketComponent;
  let fixture: ComponentFixture<BetMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
