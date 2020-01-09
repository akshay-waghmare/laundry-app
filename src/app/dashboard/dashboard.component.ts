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
      name: 'asd',
      type: 'textbox'
    },
    {
      name: 'fdggg',
      type: 'textbox'
    }];
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
