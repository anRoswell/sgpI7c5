import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

// Interface
import { IHttp } from 'src/app/interfaces/IHttp';
import { ILogger } from 'src/app/interfaces/ILogger';
import { IStorage } from 'src/app/interfaces/IStorage';
import { IElectoresTmp } from 'src/app/interfaces/IElectoresTmp';

// Service
import { CheckconnectionService } from 'src/app/services/checkconnection.service';

@Component({
  selector: 'app-control-electores',
  templateUrl: './control-electores.page.html',
  styleUrls: ['./control-electores.page.scss'],
})
export class ControlElectoresPage implements OnInit {
  public segmentList: Array<any> = [
    { title: 'Registrados', icon: 'grid' },
    { title: 'Temporales', icon: 'alarm' },
  ];
  public selectedSegment = 'Registrados';
  public grids = [
    { name: 'Registrados', value: true },
    { name: 'Temporales', value: false },
  ];
  public fabShow = true;

  public electoresTmp: Array<IElectoresTmp> = [
    {
      amigo: '',
      apellidoCasado: '',
      apellidoMaterno: '',
      apellidoPaterno: '',
      barriada: '',
      barrio: '',
      calle: '',
      campaniaID: 0,
      cedula: '',
      cedulaPareja: '',
      celular1: '',
      celular2: '',
      celularAmigo: '',
      centroVotacionID: 0,
      comunidad: '',
      conyugePareja: '',
      corregimientoID: 0,
      correo: '',
      createdAt: new Date(),
      distritoID: 0,
      edad: 0,
      edificio: '',
      estadoCivil: '',
      facebook: '',
      fechaNacimiento: new Date(),
      hijos: '',
      id: 0,
      ingresoAproximado: '',
      instagram: '',
      lugarTrabajo: '',
      mesaNum: '',
      nivelEducativo: '',
      numCasaApto: '',
      otra: '',
      otrasReferencias: '',
      parentId: 0,
      partidoID: 0,
      pertenecePartido: '',
      primerNombre: '',
      profesionID: 0,
      provinciaID: 0,
      religionID: 0,
      religionOtra: '',
      sector: '',
      segundoNombre: '',
      sexo: '',
      situacionLaboral: '',
      situacionVivienda: '',
      snapchat: '',
      telefono: '',
      telegram: '',
      tiktok: '',
      twitter: '',
      ubicacionLat: '',
      ubicacionLng: '',
      updatedAt: new Date(),
      userIdCreatedAt: 0,
      userIdUpdatedAt: 0,
      whatsapp: '',
      youtube: '',
      completeName: '',
    },
  ];

  public electores: Array<IElectoresTmp> = [
    {
      amigo: '',
      apellidoCasado: '',
      apellidoMaterno: '',
      apellidoPaterno: '',
      barriada: '',
      barrio: '',
      calle: '',
      campaniaID: 0,
      cedula: '',
      cedulaPareja: '',
      celular1: '',
      celular2: '',
      celularAmigo: '',
      centroVotacionID: 0,
      comunidad: '',
      conyugePareja: '',
      corregimientoID: 0,
      correo: '',
      createdAt: new Date(),
      distritoID: 0,
      edad: 0,
      edificio: '',
      estadoCivil: '',
      facebook: '',
      fechaNacimiento: new Date(),
      hijos: '',
      id: 0,
      ingresoAproximado: '',
      instagram: '',
      lugarTrabajo: '',
      mesaNum: '',
      nivelEducativo: '',
      numCasaApto: '',
      otra: '',
      otrasReferencias: '',
      parentId: 0,
      partidoID: 0,
      pertenecePartido: '',
      primerNombre: '',
      profesionID: 0,
      provinciaID: 0,
      religionID: 0,
      religionOtra: '',
      sector: '',
      segundoNombre: '',
      sexo: '',
      situacionLaboral: '',
      situacionVivienda: '',
      snapchat: '',
      telefono: '',
      telegram: '',
      tiktok: '',
      twitter: '',
      ubicacionLat: '',
      ubicacionLng: '',
      updatedAt: new Date(),
      userIdCreatedAt: 0,
      userIdUpdatedAt: 0,
      whatsapp: '',
      youtube: '',
      completeName: '',
    },
  ];
  private user: any;

  constructor(
    @Inject('ILogger') public logger: ILogger,
    @Inject('IHttp') public httpService: IHttp,
    @Inject('IStorage') public storageService: IStorage,
    private checkconnectionService: CheckconnectionService,
    public alertController: AlertController,
    private router: Router,
    private menu: MenuController
  ) {}

  async ngOnInit() {
    this.user = await this.storageService.getData('userLogin');
    console.log(this.user);
    this.goToFindElectores();
  }

  async ionViewDidEnter() {
    console.log(
      `Por aqui pasa cada q entra al tab ServiciosPage ionViewDidEnter`
    );
  }

  goToFindElectores() {
    this.checkconnectionService.checkConection().then(async (_) => {
      await this.checkconnectionService.presentLoading();

      //const userData: any = await this.storageService.getData('userLogin');

      const params = new HttpParams()
        .set('userId', this.user.id.toString())
        .set('campaniaId', this.user.idCampania.toString());

      this.httpService
        .GetParams('spElectores', params)
        .subscribe((dataEditForm: any) => {
          this.electoresTmp = [];
          this.electoresTmp = dataEditForm[1];
          console.log(this.electoresTmp);

          this.electores = [];
          this.electores = dataEditForm[0];
        });
    });
  }

  ionSearch(e: any) {
    const value: string = e.detail.value;
    console.log(e);
  }

  newElector() {
    const parametros = {
      action: 'new',
      id: 0,
    };

    const navigationExtras: NavigationExtras = {
      queryParams: {
        ...parametros,
      },
      fragment: 'anchor',
    };
    this.router.navigate(['create-elector'], navigationExtras);
  }

  lockElector(data: any) {}

  editElector(data: any, action: string) {
    const parametros = {
      action,
      id: data.id,
    };

    const navigationExtras: NavigationExtras = {
      queryParams: {
        ...parametros,
      },
      fragment: 'anchor',
    };
    this.router.navigate(['create-elector'], navigationExtras);
  }

  consultarElector(data: any) {
    const parametros = {
      action: 'consultar',
      id: data.id,
    };

    const navigationExtras: NavigationExtras = {
      queryParams: {
        ...parametros,
      },
      fragment: 'anchor',
    };
    this.router.navigate(['create-elector'], navigationExtras);
  }

  //#region ION SEGMENT
  segmentChanged(ev: any) {
    this.grids.forEach((element) => {
      if ([element.name].includes(ev.detail.value)) {
        element.value = true;
        return;
      }

      if (ev.detail.value === this.grids[0].name) {
        this.fabShow = true;
      } else {
        this.fabShow = false;
      }

      element.value = false;
    });

    this.selectedSegment = ev.detail.value;
  }

  _segmentSelected(item: string, index: number) {}

  //#endregion
}
