import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormbuilderComponent } from './dynamic-formbuilder.component';

describe('DynamicFormbuilderComponent', () => {
  let component: DynamicFormbuilderComponent;
  let fixture: ComponentFixture<DynamicFormbuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormbuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
