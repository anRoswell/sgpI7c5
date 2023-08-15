import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public appPages = [
    { title: 'Inbox', url: '/home/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/home/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/home/favorites', icon: 'heart' },
    { title: 'Archived', url: '/home/archived', icon: 'archive' },
    { title: 'Trash', url: '/home/trash', icon: 'trash' },
    { title: 'Spam', url: '/home/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public openStorage: any;

  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  constructor(public menuCtrl: MenuController) {}

  ngOnInit() {
    //this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.folder = 'Home';
  }
}
