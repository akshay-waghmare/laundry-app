import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisRankingComponent } from './tennis-ranking.component';

describe('TennisRankingComponent', () => {
  let component: TennisRankingComponent;
  let fixture: ComponentFixture<TennisRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TennisRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TennisRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
