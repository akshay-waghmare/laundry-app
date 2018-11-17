import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFullerComponent } from './add-fuller.component';

describe('AddFullerComponent', () => {
  let component: AddFullerComponent;
  let fixture: ComponentFixture<AddFullerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFullerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFullerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
