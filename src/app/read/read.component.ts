import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscriber } from 'rxjs';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit{

  constructor(private service:HttpClientService){
  }

    ngOnInit(): void {
      this.get();
      this.update();
    }

    loginForm = new FormGroup({
      firstName : new FormControl(),
      lastName : new FormControl(),
      email : new FormControl(),
      phone : new FormControl(),
      company : new FormControl(),
      gender : new FormControl(),
      date : new FormControl(),
      password : new FormControl(),
      confirmPassword: new FormControl()
    })


    submit(){
      let obj ={

        firstName : this.loginForm.value.firstName,
        lastName : this.loginForm.value.lastName,
        email : this.loginForm.value.email,
        phone : this.loginForm.value.phone,
        company : this.loginForm.value.company,
        gender : this.loginForm.value.gender,
        date : this.loginForm.value.date,
        password : this.loginForm.value.password,
        confirmPassword : this.loginForm.value.confirmPassword

      }

      console.log("username",obj.firstName);
      console.log("password",obj.lastName);

      this.service.create(obj).subscribe((x:any) => {
        console.log(x);
      })
      this.loginForm.reset();
      this.get()
    }


      details:any;
      userId:any;

    get(){
      this.service.read().subscribe((resp:any) => {
        console.warn(resp);

        this.details= resp
        console.log(this.details);
      } )
    }


    edit(user:any){
      this.loginForm.patchValue( {
        firstName : user.firstName,
        lastName : user.lastName,
        email : user.email,
        phone : user.phone,
        company : user.company,
        date : user.date
      })
      this.userId = user;
    }

    update(){
      
      if(this.userId){    
        let obj ={
          firstName : this.loginForm.value.firstName,
          lastName : this.loginForm.value.lastName,
          email : this.loginForm.value.email,
          phone : this.loginForm.value.phone,
          company : this.loginForm.value.company,
          date : this.loginForm.value.date,
          id:this.userId.id
        }

        this.service.update(this.userId.id,obj).subscribe(x => console.log(x) )
        this.get();
      }
    }

  delete(user:any){
    this.service.delete(user.id).subscribe(x => console.log(x));
    this.get();
  }
  

}