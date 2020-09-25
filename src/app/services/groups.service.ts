import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

import { createdBy } from '../shared/utilities';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  groups = [];
  groupsChanged$ = new Subject<any[]>();
  subgroupsChanged$ = new Subject<any[]>();
  groupSelected$ = new BehaviorSubject<{}>({ groupId: '', subgroupId: '' });

  url = environment.url;

  constructor(private http: HttpClient) { }

  fetchGroups() {
    return this.http.get(`${this.url}/api/groups`).pipe(
      map(groups => {
        const groupsRes = [];
        groups['groups'].forEach(group => {
          groupsRes.push(createdBy(group));
        });
        return groupsRes;
      })
    ).subscribe(groups => {
      this.groups = groups;
      this.groupsChanged$.next(this.groups);
    });
  }

  createGroup(group) {
    this.http.post(`${this.url}/api/groups`, group).subscribe(response => {
      this.fetchGroups();
    })
  }

  createSubgroup(subgroup) {
    this.http.post(`${this.url}/api/subgroups`, subgroup).subscribe(response => {
      this.groups = this.groups.filter(group => group._id === response['group']['_id'])
        .map(group => createdBy(response['group']));
      this.subgroupsChanged$.next(this.groups.slice());
    });
  }

  addMember(memberBody) {
    this.http.put(`${this.url}/api/subgroups`, memberBody).subscribe(response => {
      this.groups = this.groups.filter(group => group._id === response['group']['_id'])
        .map(group => createdBy(response['group']));
      this.subgroupsChanged$.next(this.groups.slice());
    })
  }

  getGroupById(id: string) {
    return this.groups.find(group => group._id === id);
  }

  getsubgroupById(groupId: string, subgroupId: string) {
    let group = this.groups.find(group => group._id === groupId);
    return createdBy(group.subgroups.find(subgroup => subgroup._id === subgroupId));
  }

}
