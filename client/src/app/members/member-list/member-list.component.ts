import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  //members:Member[]=[];
  members$!:Observable<Member[]>;
  constructor(private memberSerivice:MembersService) { }

  ngOnInit(): void {
    this.members$=this.memberSerivice.getMembers();
    // this.loadMembers();
  }

  /*loadMembers(){
    this.memberSerivice.getMembers().subscribe(members=>{
      this.members=members;
    })
  }*/

}
