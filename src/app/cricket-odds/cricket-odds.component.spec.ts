import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketOddsComponent } from './cricket-odds.component';

describe('CricketOddsComponent', () => {
  let component: CricketOddsComponent;
  let fixture: ComponentFixture<CricketOddsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CricketOddsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CricketOddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
