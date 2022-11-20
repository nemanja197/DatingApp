import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService:AccountService,private toastr:ToastrService){}
  canActivate(): Observable<boolean> {
    return this.accountService.curentUser$.pipe(
     
      map(user=>{
        if(user){ 
        return true;
        }
         
        this.toastr.error('you shall not pass!');
        return false; 
         
      })
    )
  }
  
}
