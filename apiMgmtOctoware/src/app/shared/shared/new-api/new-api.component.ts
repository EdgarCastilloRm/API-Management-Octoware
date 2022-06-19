import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-api',
  templateUrl: './new-api.component.html',
  styleUrls: ['./new-api.component.css']
})
export class NewAPIComponent implements OnInit {
  apiForm !: FormGroup;
  actionBtn : string = "Save";
  titleForm : string = "Add New API"
  options!: FormGroup;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(private formBuilder: FormBuilder, private api: DataService, private dialogRef: MatDialogRef<NewAPIComponent>,  @Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {
    this.apiForm =  this.formBuilder.group({
      nombre_api: [null,Validators.required],
      version_api: [null, Validators.required],
      url_base: [null, Validators.required],
      descripcion_api: [null, Validators.required],
      api_key: [null],
      url_prueba: [null, Validators.required]
    });

    if(this.editData){
      this.titleForm = "Update General API Information"
      this.actionBtn = "Update",
      this.apiForm.controls['nombre_api'].setValue(this.editData.nombre_api);
      this.apiForm.controls['version_api'].setValue(this.editData.version_api);
      this.apiForm.controls['url_base'].setValue(this.editData.url_base);
      this.apiForm.controls['descripcion_api'].setValue(this.editData.descripcion_api);
      this.apiForm.controls['api_key'].setValue(this.editData.api_key);
      this.apiForm.controls['url_prueba'].setValue(this.editData.url_prueba);
    }
  }

  addAPI(){
    if(!this.editData){
      if(this.apiForm.valid){
        this.api.postAPI(this.apiForm.value)
        .subscribe({
          next: (res)=>{
            this.Toast.fire({
              icon: 'success',
              title: 'API was added successfully.',
              color: '#FFFFFF',
              background: '#329B22',
              iconColor: '#FFFFFF'
            })
            this.apiForm.reset();
            this.dialogRef.close('save');
          },
          error: (err)=>{
            this.Toast.fire({
              icon: 'error',
              title: 'Error while adding API.',
              color: '#FFFFFF',
              background: '#C71717',
              iconColor: '#FFFFFF'
            })
          }
        })
      }else{
        this.Toast.fire({
          icon: 'error',
          title: 'Please fill all fields.',
          color: '#FFFFFF',
          background: '#C71717',
          iconColor: '#FFFFFF'
        })
      }
    }else{
      if(this.apiForm.valid){
        this.api.putAPI(this.apiForm.value, this.editData.id_api)
        .subscribe({
          next: (res)=>{
            this.Toast.fire({
              icon: 'success',
              title: 'API was updated successfully.',
              color: '#FFFFFF',
              background: '#329B22',
              iconColor: '#FFFFFF'
            })
            this.apiForm.reset();
            this.dialogRef.close('save');
          },
          error: (err)=>{
            this.Toast.fire({
              icon: 'error',
              title: 'Error while updating API.',
              color: '#FFFFFF',
              background: '#C71717',
              iconColor: '#FFFFFF'
            })
          }
        })
      }else{
        this.Toast.fire({
          icon: 'error',
          title: 'Please fill all fields.',
          color: '#FFFFFF',
          background: '#C71717',
          iconColor: '#FFFFFF'
        })
      }
    }
  }
}
