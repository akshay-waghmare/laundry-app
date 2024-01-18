import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisCardListComponent } from './tennis-card-list.component';

describe('TennisCardListComponent', () => {
  let component: TennisCardListComponent;
  let fixture: ComponentFixture<TennisCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TennisCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TennisCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
