import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ContactRequest } from '../model/contact.models';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  formContact : FormGroup = this.formBuilder.group({});

  constructor(private formBuilder:FormBuilder) {
  this.formContact = this.formBuilder.group({
   username : ['',[Validators.required]],
   email : ['',[Validators.required,Validators.email]],
   mensaje : ['',[Validators.required]]
  });
}
  ngOnInit(): void {
  }
  contact():void{
    const username = this.formContact.get('username')?.value;
    const email = this.formContact.get('email')?.value;
    const mensaje = this.formContact.get('mensaje')?.value;
    const data = {
      username:username,
      email:email,
      mensaje:mensaje
    } as ContactRequest;
    console.log(data);
  }

}
