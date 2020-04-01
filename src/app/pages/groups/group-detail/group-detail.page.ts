import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.page.html',
  styleUrls: ['./group-detail.page.scss'],
})
export class GroupDetailPage implements OnInit {

  group;

  constructor(private groupsService: GroupsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.group = this.groupsService.getGroupById(params['id']);
      console.log(this.group);
    });
  }

}
