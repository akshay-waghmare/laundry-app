import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapeControlComponent } from './scrape-control.component';

describe('ScrapeControlComponent', () => {
  let component: ScrapeControlComponent;
  let fixture: ComponentFixture<ScrapeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrapeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
