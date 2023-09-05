import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

// Interface
import { IHttp } from 'src/app/interfaces/IHttp';
import { ILogger } from 'src/app/interfaces/ILogger';
import { IStorage } from 'src/app/interfaces/IStorage';

// Service
import { CheckconnectionService } from 'src/app/services/checkconnection.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.page.html',
  styleUrls: ['./create-campaign.page.scss'],
})
export class CreateCampaignPage implements OnInit {
  public partidosPoliticos: Array<any> = [];
  public circuitos: Array<any> = [];
  public postulaciones: Array<any> = [];
  public form: FormGroup;
  public idCircuito = 0;
  public title = 'Crear';
  public action = 'crear';
  campania: any;

  constructor(
    @Inject('ILogger') public logger: ILogger,
    @Inject('IHttp') public http: IHttp,
    @Inject('IStorage') public storageService: IStorage,
    private checkconnectionService: CheckconnectionService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    this.form = this.fb.group({
      nombreCampania: ['', [Validators.required]],
      candidatoApellido: ['', [Validators.required]],
      idPartido: ['', [Validators.required]],
      idCircuito: ['', [Validators.required]],
      idPostulacion: ['', [Validators.required]],
      candidatoNombre: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      userIdCreatedAt: ['', [Validators.required]]
      /*,userIdUpdatedAt: [''],*/
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.route.params.subscribe(async (params: any) => {
      console.log(params);
      await this.getDataCrearCampania();
      if (![null, undefined].includes(params.id)) {
        this.title = 'Editar';
        this.action = 'editar';
        console.log(`ionViewDidEnter`);
        this.editForm();
      }
    });
  }

  public async saveForm() {
    const userData: any = await this.storageService.getData('userLogin');
    this.form.patchValue({ userIdCreatedAt: userData.id });

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    } 

    this.checkconnectionService.checkConection().then(async (_) => {
      if (this.action === 'crear') {
        const dataForm = this.form.value;
        await this.checkconnectionService.presentLoading();
        this.http.Post('campania', dataForm).subscribe((resp) => {
          this.presentAlert();
        });
      } else {
        this.form.patchValue({ userIdUpdatedAt: userData.id });
        const dataForm = this.form.value;
        await this.checkconnectionService.presentLoading();
        this.http
          .Put(`campania/${this.campania.id}`, dataForm)
          .subscribe((resp) => {
            this.presentAlert();
          });
      }
    });
    
  }

  private async editForm() {
    this.campania = await this.storageService.getData('_campania');
    let { idPartido, idCircuito, idPostulacion } = this.campania;

    idPartido = idPartido.toString();
    idCircuito = idCircuito.toString();
    idPostulacion = idPostulacion.toString();

    this.form.patchValue(this.campania);
    this.form.patchValue({ idPartido, idCircuito, idPostulacion });
  }

  resetForm(){
    this.form.reset();
  }
  

  //#region ALERT
  private async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'GUARDAR!!!',
      message: 'Registro exitoso.',
      buttons: ['OK'],
    });
    await alert.present();
  }
  //#endregion

  /**
   * Metodo que obtiene la data de los selectores del formulario desde la base de datos
   *
   * @returns
   */
  private async getDataCrearCampania() {
    return new Promise((resolve, reject) => {
      this.checkconnectionService.checkConection().then(async (_) => {
        await this.checkconnectionService.presentLoading();
        this.http.Get('spcampania').subscribe((resp) => {
          this.partidosPoliticos = resp[0];
          this.circuitos = resp[1];
          this.postulaciones = resp[2];
          console.log(`getDataCrearCampania`);
          resolve(true);
        });
      });
    });
  }
}

