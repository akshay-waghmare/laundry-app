import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullerListComponent } from './fuller-list.component';

describe('FullerListComponent', () => {
  let component: FullerListComponent;
  let fixture: ComponentFixture<FullerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
