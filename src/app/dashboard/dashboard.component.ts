import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public form : FormGroup;
  formvalue : any= {};

  fields: any[] = [{
    name: 'firstname',
    type: 'textbox'
  },
    {
      name: 'secondname',
      type: 'textbox'
    },
    {
      name: 'tryrty',
      type: 'textbox'
    },
    {
      type: 'radio',
      name: 'country',
      label: 'Country',
      value: 'in',
      required: true,
      options: [
        { key: 'm', label: 'Male' , mode:'male'},
        { key: 'm', label: 'Female', mode:'fem' }
      ]
    }
  ];

  constructor() { }
    

  ngOnInit() {
      this.form = new FormGroup({
        fields: new FormControl(JSON.stringify(this.fields))
      })

      this.form.valueChanges.subscribe(
        (update) => {

          console.log("inside here" + update);
          this.fields = JSON.parse(update.fields);
        }
      );
    }
  
    afterSubmit(){
      console.log("data");
    }
    
    asd(data){
      console.log("im i n" + data);
      this.formvalue = JSON.stringify(data);
    }

}
