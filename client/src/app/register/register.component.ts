import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  //model:any={};
  registerForm!:FormGroup;
  maxDate!:Date;
  validationErrors:string[]=[];
  constructor(private accountServicce: AccountService,private toastr:ToastrService, private fb:FormBuilder,
    private router:Router ) { }

  ngOnInit(): void {
    this.intitializeForm();
    this.maxDate=new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }
  intitializeForm(){
    this.registerForm=this.fb.group({
      gender:['male'],
      username:['',Validators.required],
      knownAs:['',Validators.required],
      dateOfBirth:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],  
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword:['',[Validators.required,this.matchValue('password')] ]

    });
  }
  matchValue(matchTo: string):ValidatorFn{

      return(control:AbstractControl)=>{
      //  const c = control?.parent?.controls as any;
      //  return control?.value === c[matchTo].value? null:{isMatching: true};
         return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
      }
  }
  Register(){
    // console.log(this.registerForm.value);
   this.accountServicce.register(this.registerForm.value).subscribe(response=>{

      this.router.navigateByUrl('/members');
    },error=>{
      this.validationErrors=error;
      
    })
  }
  /*   Register(){
    console.log(this.model);
  }*/
  Cancel(){
    this.cancelRegister.emit(false);
  }
}
