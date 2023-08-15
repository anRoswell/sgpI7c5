import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { IAuthenticate } from 'src/app/interfaces/IAuthenticate';

// Interfaces
import { IHttp } from 'src/app/interfaces/IHttp';
import { ILogger } from 'src/app/interfaces/ILogger';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title = 'Soy el Login';
  constructor(
    @Inject('ILogger') public logger: ILogger,
    @Inject('IHttp') public http: IHttp,
    @Inject('IAuthenticate') public authenticateService: IAuthenticate,
    private menuCtrl: MenuController,
    private router: Router
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  login() {
    this.logger.info('Login');
    this.authenticateService
      .login$({
        usuario: '1143329370',
        password: 'Syspotec2024$',
      })
      .subscribe((resp) => {
        if (resp.data.status) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/']);
        }
      });
  }
}
