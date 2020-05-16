import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-select-institute',
  templateUrl: './select-institute.component.html',
  styleUrls: ['./select-institute.component.scss'],
})
export class SelectInstituteComponent implements OnInit {

  url = environment.url;
  institutes: any[];

  constructor(private modalController: ModalController, private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`${this.url}/api//groupswithouttoken`).subscribe(response => {
      this.institutes = response['groups'];
    })
  }

  async instituteSelected(institute) {
    await this.modalController.dismiss(institute);
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
