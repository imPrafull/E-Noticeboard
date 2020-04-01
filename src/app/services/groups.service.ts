import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { createdBy } from '../shared/utilities';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  groups = []
  groupsChanged$ = new Subject<any[]>();

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
      this.groupsChanged$.next(this.groups.slice());
    });
  }

  createGroup(group) {
    this.http.post(`${this.url}/api/groups`, group).subscribe(response => {
      this.groups.push(createdBy(response['group']));
      this.groupsChanged$.next(this.groups.slice());
    });
  }

  getGroups() {
    return this.groups.slice();
  }

  getGroupById(id: string) {
    return this.groups.find(group => group._id === id);
  }

}
