import { Component, Inject, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

// Interface
import { IAuthenticate } from 'src/app/interfaces/IAuthenticate';
import { IBackButton } from 'src/app/interfaces/IBackButton';
import { IStorage } from 'src/app/interfaces/IStorage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'CREAR CAMPAÑA',
      url: 'crear-campania',
      icon: 'home',
    },
    {
      title: 'ASIGNAR PERSONAL',
      url: 'asignar-personal',
      icon: 'home',
    },
    {
      title: 'CONTROL ELECTORES',
      url: 'control-electores',
      icon: 'home',
    },
    {
      title: 'TRASPASO PERSONAL',
      url: 'traspaso-personal',
      icon: 'home',
    },
    {
      title: 'TRASPASO ELECTOR',
      url: 'traspaso-elector',
      icon: 'home',
    },
    {
      title: 'BLOQUEAR FUNCIONARIO',
      url: 'bloquear-funcionario',
      icon: 'home',
    },
    {
      title: 'CONTACTANOS',
      url: '/home/contactanos',
      icon: 'mail',
    },
    { title: 'Favorites', url: '/home/favorites', icon: 'heart' },
  ];
  public image = 'assets/icon/avatar.png';
  public openStorage: any;

  public folder!: string;

  constructor(
    @Inject('IStorage') private storageService: IStorage,
    @Inject('IBackButton') private backButtonService: IBackButton,
    @Inject('IAuthenticate') private authenticateService: IAuthenticate,
    public menu: MenuController,
    private platform: Platform
  ) {}

  async ngOnInit() {
    //this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.folder = 'Home';
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)

    this.menu.enable(false);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.backButtonService.init();
    });
  }

  /**
   * Logout
   */
  logout(): void {
    this.authenticateService.logout();
  }
}
