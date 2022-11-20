import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //@Input() usersFromHomeComponent:any;
  @Output() cancelRegister =new EventEmitter();
  model:any={};
  constructor(private accountServicce: AccountService) { }

  ngOnInit(): void {
  }
  Register(){
    this.accountServicce.register(this.model).subscribe(response=>{
      console.log(response);
      this.Cancel();
    },error=>{
      console.log(error);
    })
  }
/*  Register(){
    console.log(this.model);
  }*/
  Cancel(){
    this.cancelRegister.emit(false);
  }
}
