import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/servicios/snackbar/snackbar.service';
import { ConfirmDialogService } from 'src/app/servicios/confirm-dialog/confirm-dialog.service';
import { ClientService } from 'src/app/servicios/client/client.service';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  singularName : string = 'Cliente'
  pluralName : string = 'Clientes'
  actionName : string = 'Editar'
  formGroup : FormGroup;
  currentClient : any;

  constructor(
    private router : Router,
    private formBuilder : FormBuilder,
    // Dialog and snackBar services
    private snackBar : SnackbarService,
    private confirmDialog : ConfirmDialogService,
    private api : ClientService,
    private activatedRoute : ActivatedRoute,
  ) {
    // Building the form with the formBuilder

    this.formGroup = this.formBuilder.group({
      cedula : ['', Validators.required],
      names : ['', Validators.required],
      surnames : ['', Validators.required],
      email : new FormControl('', [Validators.required, Validators.email]),
      phone : ['', Validators.required],
      sex: ['', Validators.required],
      address : ['', Validators.required],
      state : ['', Validators.required]
    });
  }

  toClientList() {
    this.router.navigate(['dashboard/clientes']);
  }

  editClient() {
    this.formGroup.valid ? this.showDialog() : 
    this.snackBar.mensaje('Llene el formulario correctamente');
  }

  showDialog() {
    let clientName = this.activatedRoute.snapshot.paramMap.get('names');
    const DIALOGINFO = {
      title: this.actionName + ' ' + this.singularName,
      message: '¿Está seguro de que quiere ' + this.actionName + ' el ' + this.singularName + ' ' + clientName,
      cancelText: 'Cancelar',
      confirmText: this.actionName
    }
    this.confirmDialog.open(DIALOGINFO)
    this.sendForm()
  }

  sendForm () {
    let clientId = this.activatedRoute.snapshot.paramMap.get('id');
    this.confirmDialog.confirmed().subscribe(
      confirmed => {
        if (confirmed) {
          let formData = this.fillForm();
          this.api.putClient(Number(clientId), formData).subscribe ({
            next : (res) => {
              this.snackBar.mensaje(this.singularName + ' actualizado exitosamente')
              this.toClientList();
            },
            error : (res) => {
              this.confirmDialog.error(res.error);
            }
          })
        }
      }
    )
  }

  fillForm() {
    let user_client_modify = localStorage.getItem('user_id');
    let formData : FormData = new FormData();
    formData.append('cedula', this.formGroup.get('cedula')?.value);
    formData.append('names', this.formGroup.get('names')?.value);
    formData.append('surnames', this.formGroup.get('surnames')?.value);
    formData.append('email', this.formGroup.get('email')?.value);
    formData.append('phone', this.formGroup.get('phone')?.value);
    formData.append('address', this.formGroup.get('address')?.value);
    formData.append('sex', this.formGroup.get('sex')?.value);
    formData.append('state', this.formGroup.get('state')?.value);
    formData.append('user_client_modify', user_client_modify!);
    return formData;
  }

  ngOnInit(): void {
    let clientId = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getClientById(Number(clientId)).subscribe(
      (res) => {
        this.currentClient = res;
        this.getClientInfo();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getClientInfo() {
    this.formGroup.patchValue({
      cedula : this.currentClient.cedula,
      names : this.currentClient.names,
      surnames : this.currentClient.surnames,
      email : this.currentClient.email,
      phone : this.currentClient.phone,
      address : this.currentClient.address,
      sex : this.currentClient.sex,
      state : this.currentClient.state
    })
  }

}

