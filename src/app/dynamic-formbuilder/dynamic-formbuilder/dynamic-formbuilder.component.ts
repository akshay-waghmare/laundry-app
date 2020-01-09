import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'dynamic-formbuilder',
  templateUrl: './dynamic-formbuilder.component.html',
  styleUrls: ['./dynamic-formbuilder.component.css']
})
export class DynamicFormbuilderComponent implements OnInit {

  @Input() fields :any[] = [];
  @Output() onSubmit = new EventEmitter();

  form : FormGroup ;

  constructor() { }

  ngOnInit() {

    this.form = new FormGroup({});
    let fieldsCtrl = {};
    this.fields.forEach(field => {
      if(field.type == 'textbox'){
        
          console.log(field.name);
          fieldsCtrl[field.name] = new FormControl('');
          console.log("logging fieldsctrl" + fieldsCtrl);
        // this.form.addControl(field.name,new FormControl(''));
      }
      else{

        let opts = {};
        field.options.forEach(option => {
          opts[option.key] = new FormControl(option.value);
        });

        fieldsCtrl[field.name] = new FormGroup(opts);
      }

      this.form = new FormGroup(fieldsCtrl);

     
    });
    console.log("form inside dynamci-formbuilder" , this.form);

 }
}
