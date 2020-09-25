import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.page.html',
  styleUrls: ['./group-list.page.scss'],
})
export class GroupListPage implements OnInit {

  groups = [];
  subscription: Subscription;
  groupName = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]);

  constructor(
    private groupsService: GroupsService, private router: Router, private authService: AuthService
  ) { }
 
  ngOnInit() {
    this.groupsService.groupsChanged$.subscribe(groups => {
      this.groups = groups;
    })
    this.groupsService.fetchGroups();
  }

  onGroupClick(groupId) {
    this.groupsService.groupSelected$.next({groupId: groupId, subgroupId: ''});
    this.router.navigate(['groups', 'group-detail']);
  }

  createGroup() {
    const groupBody = {
      name: this.groupName.value,
      createdBy: this.authService.user['id']
    };
    this.groupsService.createGroup(groupBody);
  }

}
