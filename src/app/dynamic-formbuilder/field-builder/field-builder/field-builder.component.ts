import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'field-builder',
  templateUrl: './field-builder.component.html',
  styleUrls: ['./field-builder.component.css']
})
export class FieldBuilderComponent implements OnInit {

  @Input() field:any = {};
  @Input() form:FormGroup;


  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }
  constructor() { }

  ngOnInit() {
    console.log("form inside formbuilder" + this.form);
    console.log("inside fieldsbuilder componenet this.field.name" + this.field.name);
  }

}
