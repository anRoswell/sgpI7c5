import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { IStorage } from 'src/app/interfaces/IStorage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    @Inject('IStorage') public storageService: IStorage,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.storageService.setData('view', 'home');
  }
}
