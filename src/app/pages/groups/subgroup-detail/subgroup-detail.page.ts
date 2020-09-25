import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-subgroup-detail',
  templateUrl: './subgroup-detail.page.html',
  styleUrls: ['./subgroup-detail.page.scss'],
})
export class SubgroupDetailPage implements OnInit {
 
  subgroup = {};
  groupId = '';
  subgroupId = '';
  memberEmail = new FormControl('', [Validators.required, , Validators.email]);

  constructor(private groupsService: GroupsService, private route: ActivatedRoute, private authService: AuthService) { } 

  ngOnInit() {
    this.groupsService.groupSelected$.subscribe(groupSelected => {
      this.groupId = groupSelected['groupId'];
      this.subgroupId = groupSelected['subgroupId'];
      this.subgroup = this.groupsService.getsubgroupById(groupSelected['groupId'], groupSelected['subgroupId']);
    });
    this.groupsService.subgroupsChanged$.subscribe(group => {
      this.subgroup = this.groupsService.getsubgroupById(this.groupId, this.subgroupId);
    });
  }

  addMember() {
    let memberBody = {
      groupId: this.groupId,
      subgroupId: this.subgroupId,
      memberId: false,
      memberEmail: this.memberEmail.value
    }
    this.groupsService.addMember(memberBody);
  }

}
