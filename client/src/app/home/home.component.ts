import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode =false;
  users:any;

  //constructor(private http:HttpClient) { }
  constructor() { }

  ngOnInit(): void {
   // this.GetUsers();
  }
  RegisterToggle(){
    this.registerMode=!this.registerMode;
  }
 /* GetUsers(){
    this.http.get("https://localhost:5001/api/users").subscribe(users=>{
      this.users=users;
    })
  }*/
  CancelRegisterMood(event:boolean){
    this.registerMode=event;
  }
}
