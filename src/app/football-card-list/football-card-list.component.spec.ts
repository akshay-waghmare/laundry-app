import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballCardListComponent } from './football-card-list.component';

describe('FootballCardListComponent', () => {
  let component: FootballCardListComponent;
  let fixture: ComponentFixture<FootballCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
