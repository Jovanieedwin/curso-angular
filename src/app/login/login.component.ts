import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginRequest } from '../model/login.models';
import { LoginService } from '../services/login.service';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from '../services/data.service';


import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder:FormBuilder , private loginService: LoginService,private router:Router,private dataService: DataService) {
    this.formLogin = this.formBuilder.group({
      username : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.minLength(3)]]
    });
   }

  ngOnInit(): void {
  }

  login():void{
    const username = this.formLogin.get('username')?.value;
    const password = this.formLogin.get('password')?.value;

    const data = {
      email:username,
      password: password
    } as LoginRequest;
    console.log(data);

    this.loginService.login(data).subscribe((res)=> {
      console.log(res);
      this.dataService.isLoading.next(false);
      this.router.navigate(['home']);
      this.dataService.isLoading.next(false);
    },(err)=>{
      console.log("error",err);
      alert(err.error.error);

    });
  }
}
