import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  groupName = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]);
  subscription: Subscription;

  constructor(
    private groupsService: GroupsService, private authService: AuthService, private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.groupsService.fetchGroups();
    this.subscription = this.groupsService.groupsChanged$.subscribe(groups => {
      this.groups = groups;
    });
  }

  createGroup() {
    const groupBody = {
      name : this.groupName.value,
      createdBy: this.authService.user['id']
    }
    this.groupsService.createGroup(groupBody);
  }

  onGroupClick(groupId) {
    this.router.navigate(['groups', groupId]);
  }

}
