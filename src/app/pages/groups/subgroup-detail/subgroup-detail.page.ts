import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-subgroup-detail',
  templateUrl: './subgroup-detail.page.html',
  styleUrls: ['./subgroup-detail.page.scss'],
})
export class SubgroupDetailPage implements OnInit {

  subgroup = {};
  subgroupId = '';

  constructor(private groupsService: GroupsService, private route: ActivatedRoute,) { } 

  ngOnInit() {
    this.groupsService.groupSelected$.subscribe(groupSelected => {
      this.subgroup = this.groupsService.getsubgroupById(groupSelected['groupId'], groupSelected['subgroupId']);
    });
  }

}
