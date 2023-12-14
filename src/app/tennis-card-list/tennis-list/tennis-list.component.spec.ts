import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisListComponent } from './tennis-list.component';

describe('TennisListComponent', () => {
  let component: TennisListComponent;
  let fixture: ComponentFixture<TennisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TennisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TennisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
