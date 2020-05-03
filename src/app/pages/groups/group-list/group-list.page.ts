import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.page.html',
  styleUrls: ['./group-list.page.scss'],
})
export class GroupListPage implements OnInit {

  groups = [];
  subscription: Subscription;

  constructor(
    private groupsService: GroupsService, private router: Router,
  ) { }

  ngOnInit() {
    this.groupsService.fetchGroups().subscribe(groups => {
      this.groups = groups;
    });    
  }  

  onGroupClick(groupId) {
    this.groupsService.groupSelected$.next({groupId: groupId, subgroupId: ''});
    this.router.navigate(['groups', 'group-detail']);
  }

}
