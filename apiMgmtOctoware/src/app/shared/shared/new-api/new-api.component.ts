import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-api',
  templateUrl: './new-api.component.html',
  styleUrls: ['./new-api.component.css']
})
export class NewAPIComponent implements OnInit {
  apiForm !: FormGroup;
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

  constructor(private formBuilder: FormBuilder, private api: DataService, private dialogRef: MatDialogRef<NewAPIComponent>) { }

  ngOnInit(): void {
    this.apiForm =  this.formBuilder.group({
      nombre_api: [null,Validators.required],
      version_api: [null, Validators.required],
      url_base: [null, Validators.required],
      descripcion_api: [null, Validators.required]
    });
  }

  addAPI(){
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
  }
}
