import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css']
})
export class TextboxComponent implements OnInit {

  @Input() field:any ={};
  @Input() form:FormGroup;

  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }
  constructor() { }

  ngOnInit() {
    console.log("form inside textbox" + this.form);
    console.log("this.field name inside textbox" + this.field.name );
  }

}
