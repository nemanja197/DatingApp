import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private accountServicce: AccountService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  Register(){
    this.accountServicce.register(this.model).subscribe(response=>{
      console.log(response);
      this.Cancel();
    },error=>{
      console.log(error);
      this.toastr.error(error.error);
    })
  }
/*  Register(){
    console.log(this.model);
  }*/
  Cancel(){
    this.cancelRegister.emit(false);
  }
}
