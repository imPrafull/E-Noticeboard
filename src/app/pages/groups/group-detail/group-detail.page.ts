import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GroupsService } from 'src/app/services/groups.service';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.page.html',
  styleUrls: ['./group-detail.page.scss'],
})
export class GroupDetailPage implements OnInit {

  group = { subgroups: [] };
  groupId = '';
  groupName = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]);
 
  constructor(
    private groupsService: GroupsService, private route: ActivatedRoute, private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.groupsService.groupSelected$.subscribe(groupSelected => {
      this.groupId = groupSelected['groupId']
      this.group = this.groupsService.getGroupById(this.groupId);
    });
    this.groupsService.subgroupsChanged$.subscribe(group => {
      this.group = this.groupsService.getGroupById(this.groupId);
    });
  }

  onSubgroupClick(subgroupId) {
    this.groupsService.groupSelected$.next({groupId: this.groupId, subgroupId: subgroupId});
    this.router.navigate(['groups', 'subgroup-detail']);
  }

  createSubgroup() {
    const groupBody = {
      id: this.groupId,
      subgroup: {
        name : this.groupName.value,
        createdBy: this.authService.user['id'],
        members: [ this.authService.user['id'] ]
      }
    }
    this.groupsService.createSubgroup(groupBody);
  }

}
