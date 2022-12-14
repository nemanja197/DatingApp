import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl=environment.apiUrl ;
  private currentUserSource =new ReplaySubject<User>(1);
  curentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient) {

   }

   login(model:any){
    return this.http.post<User>(this.baseUrl+'account/login',model).pipe(
      map((response: User)=>{
        const user=response;
        if(user){
          this.setCurrentUser(user);
          //   localStorage.setItem('user',JSON.stringify(user));
        // this.currentUserSource.next(user);
          
        }
      })
    )
   }

   setCurrentUser(user:User){
    localStorage.setItem('user',JSON.stringify(user));  
    this.currentUserSource.next(user);
   }

   logout(){
   localStorage.removeItem('user');
   this.currentUserSource.next(null!);
   }

   register(model:any){
    return this.http.post<User>(this.baseUrl+'account/register',model).pipe(
      map((user)=>{
        if(user){
          this.setCurrentUser(user);
          //  localStorage.setItem('user',JSON.stringify(user));
          //this.currentUserSource.next(user);
        }
      })
    )
   }
}
