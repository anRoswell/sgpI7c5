import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, AlertController, MenuController } from '@ionic/angular';
import { IHttp } from 'src/app/interfaces/IHttp';
import { ILogger } from 'src/app/interfaces/ILogger';
import { IStorage } from 'src/app/interfaces/IStorage';
import { CheckconnectionService } from 'src/app/services/checkconnection.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-create-elector',
  templateUrl: './create-elector.page.html',
  styleUrls: ['./create-elector.page.scss'],
})
export class CreateElectorPage implements OnInit {
  //#region  Variables
  @ViewChild(IonContent, { static: false }) content: IonContent | undefined;

  customActionSheetOptions: any = {};

  public segmentList: Array<any> = [
    { title: 'Principal', icon: 'grid' },
    { title: 'Ubicación', icon: 'locate' },
    { title: 'Estado Civil', icon: 'basketball' },
    { title: 'Datos generales', icon: 'cog' },
    { title: 'Redes Sociales', icon: 'logo-whatsapp' },
  ];
  public selectedSegment = 'Principal';

  public grids = [
    { name: 'Principal', value: true },
    { name: 'Ubicación', value: false },
    { name: 'Estado Civil', value: false },
    { name: 'Datos generales', value: false },
    { name: 'Redes Sociales', value: false },
  ];

  public validationsMessage = {
    cedula: [
      {
        type: 'required',
        message: 'Requerido',
      },
      {
        type: 'email',
        message: 'Debe ingresar un email valido',
      },
    ],
    primerNombre: [
      {
        type: 'required',
        message: 'Requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo 10 letras para el nombre',
      },
    ],
    apellidoPaterno: [
      {
        type: 'required',
        message: 'Requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo 10 letras para el nombre',
      },
    ],
    celular1: [
      {
        type: 'required',
        message: 'El célular es requerido',
      },
      {
        type: 'minlength',
        message: 'Requerido',
      },
    ],
    correo: [
      {
        type: 'required',
        message: 'Requerido',
      },
    ],
    sexo: [
      {
        type: 'required',
        message: 'Requerido',
      },
    ],
    edad: [
      {
        type: 'required',
        message: 'Requerido',
      },
    ],
    fechaNacimiento: [
      {
        type: 'required',
        message: 'Requerido',
      },
    ],
  };

  public form: FormGroup;
  public action = 'new';
  /** Variables para los selectores del formulario **/
  public sexos: any;
  public provincias: any;
  public distritos: any;
  public corregimientos: any;
  public sectores: any;
  public centrosVotacion: any;
  public mesas: any;
  public estadosCivil: any;
  public profesiones: any;
  public nivelesEducativo: any;
  public situacionesLaborales: any;
  public situacionesVivienda: any;
  public ingresosAproximado: any;
  public pertenecenPartido: any;
  public partidosPertenecen: any;
  public religiones: any;
  public user: any;
  public electorId: any;
  userData: any;
  //#endregion

  constructor(
    @Inject('ILogger') public logger: ILogger,
    @Inject('IHttp') public httpService: IHttp,
    @Inject('IStorage') public storageService: IStorage,
    private fb: FormBuilder,
    private alertController: AlertController,
    private menu: MenuController,
    private checkconnectionService: CheckconnectionService,
    private route: ActivatedRoute
  ) {
    this.menu.enable(true);
    this.form = this.fb.group({
      id: [],
      action: ['insertTmp'],
      userIdCreatedAt: ['', [Validators.required]],
      campaniaID: ['', [Validators.required]],

      cedula: [null],
      primerNombre: [null],
      segundoNombre: [null],
      apellidoPaterno: [null],
      apellidoMaterno: [null],
      apellidoCasado: [null],
      celular1: [null],
      celular2: [null],
      telefono: [null],
      correo: [null],
      sexoID: [null],
      edad: [null],
      fechaNacimiento: [null],

      provinciaID: [null],
      distritoID: [null],
      corregimientoID: [null],
      comunidad: [null],
      barrio: [null],
      barriada: [null],
      sector: [null],
      edificio: [null],
      calle: [null],
      numCasaApto: [null],
      otrasReferencias: [null],
      ubicacionLat: [null],
      ubicacionLng: [null],
      ubicacion: [null],
      centroVotacionID: [null],
      mesaId: [null],

      estadoCivilID: [null],
      conyugePareja: [null],
      cedulaPareja: [null],
      amigo: [null],
      celularAmigo: [null],
      profesionID: [null],
      nivelEducativoID: [null],
      situacionLaboralID: [null],
      lugarTrabajo: [null],
      // hijos: this.fb.array([]),
      hijos: [null],

      situacionViviendaID: [null],
      ingresoAproximadoID: [null],
      pertenecePartidoID: [null],
      partidoID: [null],
      religionID: [null],
      religionOtra: [null],

      whatsapp: [null],
      facebook: [null],
      instagram: [null],
      twitter: [null],
      youtube: [null],
      tiktok: [null],
      telegram: [null],
      snapchapt: [null],
      otra: [null],
    });
  }

  async ngOnInit() {
    this.userData = await this.storageService.getData('userLogin');
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(async (params: any) => {
      console.log(params);

      this.electorId = 0;
      if (!['new'].includes(params.action)) {
        this.action = params.action;
        this.electorId = params.id;
        console.log(this.electorId);
      }

      this.getDataSelectFormElector();
    });
    console.log(
      `Por aqui pasa cada q entra al tab ServiciosPage ionViewDidEnter`
    );
  }

  //#region FORM
  /**
   * Formaulario para guardar la data en BD
   *
   * @returns
   */
  public async saveFormTmp() {
    this.form.patchValue({
      userIdCreatedAt: this.userData.id,
      campaniaID: this.userData.idCampania,
    });

    this.checkconnectionService.checkConection().then(async (_) => {
      if (this.action === 'new') {
        this.form.patchValue({
          action: 'insertTmp',
        });
        this.httpService
          .Post('tmpElector', this.form.value)
          .subscribe((resp) => {
            this.presentAlert('Registro exitoso!!!');
          });
      } else {
        this.form.patchValue({
          action: 'update',
        });
        const dataForm = this.form.value;

        console.log(this.form);
        this.ClearValidator();
        const ruta = `elector/${this.form.get('id')?.value}`;
        this.httpService.Put(ruta, dataForm).subscribe((resp) => {
          console.log(resp);
          this.presentAlert('');
        });
      }
    });
  }

  /**
   * Formaulario para guardar la data en BD
   *
   * @returns
   */
  public async saveForm() {
    const userData: any = await this.storageService.getData('userLogin');

    this.form.patchValue({
      userIdCreatedAt: userData.id,
      campaniaID: userData.idCampania,
      action: 'final',
      calle: 'asdasdasd',
      ubicacionLat: '23.123123123',
      ubicacionLng: '12.312312312',
    });

    console.log(this.form.value);
    this.PutValidator();
    if (!this.form.valid) {
      this.form.markAllAsTouched(); //Muestra en rojo los inputs obligatorios
      alert(`Debes llenar los datos obligatorios del formulario`);
      return;
    }

    this.checkconnectionService.checkConection().then(async (_) => {
      if (this.action === 'edit') {
        const dataForm = this.form.value;
        this.httpService
          .Put(`elector/${this.form.get('id')?.value}`, dataForm)
          .subscribe((resp: any) => {
            console.log(resp);
            this.presentAlert(resp[0][0].msg);
          });
      }
    });
  }

  private PutValidator() {
    this.PutOrClearFormValidators('cedula');
    this.PutOrClearFormValidators('primerNombre');
    this.PutOrClearFormValidators('segundoNombre');
    this.PutOrClearFormValidators('apellidoPaterno');
    this.PutOrClearFormValidators('apellidoMaterno');
    this.PutOrClearFormValidators('apellidoCasado');
    this.PutOrClearFormValidators('celular1');
    this.PutOrClearFormValidators('celular2');
    this.PutOrClearFormValidators('telefono');
    this.PutOrClearFormValidators('correo');
    this.PutOrClearFormValidators('sexoID');
    this.PutOrClearFormValidators('edad');
    this.PutOrClearFormValidators('fechaNacimiento');
    this.PutOrClearFormValidators('provinciaID');
    this.PutOrClearFormValidators('distritoID');
    this.PutOrClearFormValidators('corregimientoID');
    this.PutOrClearFormValidators('comunidad');
    this.PutOrClearFormValidators('barrio');
    this.PutOrClearFormValidators('barriada');
    this.PutOrClearFormValidators('sector');
    this.PutOrClearFormValidators('edificio');
    this.PutOrClearFormValidators('calle');
    this.PutOrClearFormValidators('numCasaApto');
    this.PutOrClearFormValidators('otrasReferencias');
    this.PutOrClearFormValidators('ubicacionLat');
    this.PutOrClearFormValidators('ubicacionLng');
    this.PutOrClearFormValidators('ubicacion');
    this.PutOrClearFormValidators('centroVotacionID');
    this.PutOrClearFormValidators('mesaId');
    this.PutOrClearFormValidators('estadoCivilID');
    this.PutOrClearFormValidators('conyugePareja');
    this.PutOrClearFormValidators('cedulaPareja');
    this.PutOrClearFormValidators('amigo');
    this.PutOrClearFormValidators('celularAmigo');
    this.PutOrClearFormValidators('profesionID');
    this.PutOrClearFormValidators('nivelEducativoID');
    this.PutOrClearFormValidators('situacionLaboralID');
    this.PutOrClearFormValidators('lugarTrabajo');
    this.PutOrClearFormValidators('hijos');
    this.PutOrClearFormValidators('situacionViviendaID');
    this.PutOrClearFormValidators('ingresoAproximadoID');
    this.PutOrClearFormValidators('pertenecePartidoID');
    this.PutOrClearFormValidators('partidoID');
    this.PutOrClearFormValidators('religionID');
    this.PutOrClearFormValidators('religionOtra');
    this.PutOrClearFormValidators('whatsapp');
    this.PutOrClearFormValidators('facebook');
    this.PutOrClearFormValidators('instagram');
    this.PutOrClearFormValidators('twitter');
    this.PutOrClearFormValidators('youtube');
    this.PutOrClearFormValidators('tiktok');
    this.PutOrClearFormValidators('telegram');
    this.PutOrClearFormValidators('snapchapt');
    this.PutOrClearFormValidators('otra');
  }
  private ClearValidator() {
    this.PutOrClearFormValidators('cedula', 'noRequired');
    this.PutOrClearFormValidators('primerNombre', 'noRequired');
    this.PutOrClearFormValidators('segundoNombre', 'noRequired');
    this.PutOrClearFormValidators('apellidoPaterno', 'noRequired');
    this.PutOrClearFormValidators('apellidoMaterno', 'noRequired');
    this.PutOrClearFormValidators('apellidoCasado', 'noRequired');
    this.PutOrClearFormValidators('celular1', 'noRequired');
    this.PutOrClearFormValidators('celular2', 'noRequired');
    this.PutOrClearFormValidators('telefono', 'noRequired');
    this.PutOrClearFormValidators('correo', 'noRequired');
    this.PutOrClearFormValidators('sexoID', 'noRequired');
    this.PutOrClearFormValidators('edad', 'noRequired');
    this.PutOrClearFormValidators('fechaNacimiento', 'noRequired');
    this.PutOrClearFormValidators('provinciaID', 'noRequired');
    this.PutOrClearFormValidators('distritoID', 'noRequired');
    this.PutOrClearFormValidators('corregimientoID', 'noRequired');
    this.PutOrClearFormValidators('comunidad', 'noRequired');
    this.PutOrClearFormValidators('barrio', 'noRequired');
    this.PutOrClearFormValidators('barriada', 'noRequired');
    this.PutOrClearFormValidators('sector', 'noRequired');
    this.PutOrClearFormValidators('edificio', 'noRequired');
    this.PutOrClearFormValidators('calle', 'noRequired');
    this.PutOrClearFormValidators('numCasaApto', 'noRequired');
    this.PutOrClearFormValidators('otrasReferencias', 'noRequired');
    this.PutOrClearFormValidators('ubicacionLat', 'noRequired');
    this.PutOrClearFormValidators('ubicacionLng', 'noRequired');
    this.PutOrClearFormValidators('ubicacion', 'noRequired');
    this.PutOrClearFormValidators('centroVotacionID', 'noRequired');
    this.PutOrClearFormValidators('mesaId', 'noRequired');
    this.PutOrClearFormValidators('estadoCivilID', 'noRequired');
    this.PutOrClearFormValidators('conyugePareja', 'noRequired');
    this.PutOrClearFormValidators('cedulaPareja', 'noRequired');
    this.PutOrClearFormValidators('amigo', 'noRequired');
    this.PutOrClearFormValidators('celularAmigo', 'noRequired');
    this.PutOrClearFormValidators('profesionID', 'noRequired');
    this.PutOrClearFormValidators('nivelEducativoID', 'noRequired');
    this.PutOrClearFormValidators('situacionLaboralID', 'noRequired');
    this.PutOrClearFormValidators('lugarTrabajo', 'noRequired');
    // hijos: this.fb.array([]), 'noRequired',
    this.PutOrClearFormValidators('hijos', 'noRequired');
    this.PutOrClearFormValidators('situacionViviendaID', 'noRequired');
    this.PutOrClearFormValidators('ingresoAproximadoID', 'noRequired');
    this.PutOrClearFormValidators('pertenecePartidoID', 'noRequired');
    this.PutOrClearFormValidators('partidoID', 'noRequired');
    this.PutOrClearFormValidators('religionID', 'noRequired');
    this.PutOrClearFormValidators('religionOtra', 'noRequired');
    this.PutOrClearFormValidators('whatsapp', 'noRequired');
    this.PutOrClearFormValidators('facebook', 'noRequired');
    this.PutOrClearFormValidators('instagram', 'noRequired');
    this.PutOrClearFormValidators('twitter', 'noRequired');
    this.PutOrClearFormValidators('youtube', 'noRequired');
    this.PutOrClearFormValidators('tiktok', 'noRequired');
    this.PutOrClearFormValidators('telegram', 'noRequired');
    this.PutOrClearFormValidators('snapchapt', 'noRequired');
    this.PutOrClearFormValidators('otra', 'noRequired');
  }

  /**
   *
   * Metodo para actualizar el control del formulario a requerido
   * @param controlname nombre del control
   */
  private PutOrClearFormValidators(
    controlname: string,
    option: string = 'required'
  ) {
    let control: AbstractControl<any, any> | null = null;
    control = this.form.get(controlname);

    switch (option) {
      case 'required':
        control?.setValidators([Validators.required]);
        break;
      default:
        control?.clearValidators();
        break;
    }
    control?.updateValueAndValidity();
  }

  /**
   * Metodo q valida los campos de los formularios
   *
   * @param field = campo a validar
   * @param validationType tipo de validacion a mostrar mensaje de error
   * @returns devuelve boolean
   */
  isValid(field: string, validationType: string) {
    const f = this.form.get(field);
    return f?.hasError(validationType) && (f.dirty || f.touched);
  }

  /**
   * Obtiene coordendas
   */
  goToLocate() {
    console.log('Ubicate please');
    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates);
    };
  }

  editForm(id: any) {
    this.checkconnectionService.checkConection().then(async (_) => {
      this.httpService.Get(`idelector/${id}`).subscribe((resp) => {
        console.log(resp);
      });
    });
  }

  getElectorById(data: any) {
    console.log(data);

    this.form.patchValue({ ...data });

    let {
      sexo,
      provinciaID,
      distritoID,
      corregimientoID,
      centroVotacionID,
      mesaId,
      estadoCivilID,
      profesionID,
      nivelEducativoID,
      situacionLaboralID,
      situacionViviendaID,
      ingresoAproximadoID,
      pertenecePartidoID,
      partidoID,
      religionID,
    } = data;

    sexo = this.toString(sexo || '');
    provinciaID = this.toString(provinciaID || '');
    distritoID = this.toString(distritoID || '');
    corregimientoID = this.toString(corregimientoID || '');
    centroVotacionID = this.toString(centroVotacionID || '');
    mesaId = this.toString(mesaId || '');
    estadoCivilID = this.toString(estadoCivilID || '');
    profesionID = this.toString(profesionID || '');
    nivelEducativoID = this.toString(nivelEducativoID || '');
    situacionLaboralID = this.toString(situacionLaboralID || '');
    situacionViviendaID = this.toString(situacionViviendaID || '');
    ingresoAproximadoID = this.toString(ingresoAproximadoID) || '';
    pertenecePartidoID = this.toString(pertenecePartidoID || '');
    partidoID = this.toString(partidoID || '');
    religionID = this.toString(religionID || '');
    //mesaId = this.toString(mesaId);
    //mesaId = this.toString(mesaId);

    this.form.patchValue({
      sexoID: sexo,
      provinciaID,
      distritoID,
      corregimientoID,
      centroVotacionID,
      mesaId,
      estadoCivilID,
      profesionID,
      nivelEducativoID,
      situacionLaboralID,
      situacionViviendaID,
      ingresoAproximadoID,
      pertenecePartidoID,
      partidoID,
      religionID,
    });
  }

  setDataToForm() {}

  public toString(elemento: string) {
    return elemento === null ? elemento : elemento.toString();
  }
  //#endregion FORM

  //#region  Add Dynamic Elements
  hijos(): FormArray {
    return this.form.get('hijos') as FormArray;
  }

  newHijo(): FormGroup {
    return this.fb.group({
      nombreCompleto: ['', [Validators.required]],
      cedula: ['', [Validators.required, Validators.min(5)]],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
    });
  }

  addHijo() {
    this.hijos().push(this.newHijo());
  }

  removeHijo(i: number) {
    if (!(this.hijos().length <= 0)) {
      this.hijos().removeAt(i);
    } else {
      console.log(`Variable igual a 0 no entra`);
    }
  }
  //#endregion Add Dynamic Elements

  //#region ION-SLADE
  segmentChanged(ev: any) {
    this.grids.forEach((element) => {
      if ([element.name].includes(ev.detail.value)) {
        element.value = true;
        return;
      }

      if (ev.detail.value === this.grids[0].name) {
        //this.fabShow = true;
      } else {
        //this.fabShow = false;
      }

      element.value = false;
    });
    this.selectedSegment = ev.detail.value;
  }

  _segmentSelected(item: string, index: number) {}

  scrollToTop() {
    this.content?.scrollToTop(1500);
  }
  //#endregion IONSLIDE

  //#region ALERT
  private async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'GUARDAR!!!',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }
  //#endregion

  private async getDataSelectFormElector() {
    this.checkconnectionService.checkConection().then(async (_) => {
      await this.checkconnectionService.presentLoading();
      console.log(this.userData);

      const params = new HttpParams()
        .set('userId', this.userData.id.toString())
        .set('action', this.action.toString())
        .set('electorId', this.electorId?.toString())
        .set('campaniaId', this.userData.idCampania.toString());
      // .set('perfilId', this.userData.profileId.toString());

      this.httpService
        .GetParams('spGetDataSelectFormElector', params)
        .subscribe((dataEditForm) => {
          const { data } = dataEditForm;
          this.setdataEditForm(data);

          if (!['new'].includes(this.action)) {
            this.getElectorById(data[19][0]);
          }
        });
    });
  }

  /**
   * Mostramos la data en los selectores del formulario
   *
   * @param setdataEditForm = variable con la data que viene de la BD
   */
  private async setdataEditForm(dataEditForm: any) {
    this.sectores = dataEditForm[0];
    this.sexos = dataEditForm[1];
    this.provincias = dataEditForm[2];
    this.distritos = dataEditForm[3];
    this.corregimientos = dataEditForm[4];
    this.centrosVotacion = dataEditForm[5];
    this.mesas = dataEditForm[6];
    this.estadosCivil = dataEditForm[7];
    this.profesiones = dataEditForm[8];
    this.nivelesEducativo = dataEditForm[9];
    this.situacionesLaborales = dataEditForm[10];
    this.situacionesVivienda = dataEditForm[11];
    this.ingresosAproximado = dataEditForm[12];
    this.pertenecenPartido = dataEditForm[13];
    this.partidosPertenecen = dataEditForm[14];
    this.religiones = dataEditForm[15];

    console.log(`setdataEditForm`);
  }

  private setRequiredForm() {
    this.form.get('cedula')?.setValidators(Validators.required);
    this.form.get('primerNombre')?.setValidators(Validators.required);
    this.form.get('apellidoPaterno')?.setValidators(Validators.required);
    this.form.get('celular1')?.setValidators(Validators.required);
    this.form.get('correo')?.setValidators(Validators.required);
    this.form.get('sexoID')?.setValidators(Validators.required);
    this.form.get('edad')?.setValidators(Validators.required);
    this.form.get('fechaNacimiento')?.setValidators(Validators.required);
    this.form.get('provinciaID')?.setValidators(Validators.required);
    this.form.get('corregimientoID')?.setValidators(Validators.required);
    this.form.get('estadoCivilID')?.setValidators(Validators.required);
  }

  private removeRequiredForm() {
    this.form.clearValidators();
  }

  private validate() {
    console.log(this.action);
    console.log(this.action !== 'consultar');

    return true;
  }
}
