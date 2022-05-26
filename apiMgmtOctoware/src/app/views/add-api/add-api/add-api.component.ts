import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-api',
  templateUrl: './add-api.component.html',
  styleUrls: ['./add-api.component.css']
})
export class AddApiComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    nombre_api: [null,Validators.required],
    version_api: [null, Validators.required],
    url_base: [null, Validators.required],
    descripcion_api: [null, Validators.required]
  });
  constructor(private dataService: DataService, private formBuilder: FormBuilder, private router: Router, private dialog:MatDialog) {}

  ngOnInit(): void {
  }

  postAPI() {
    if(this.form.value.nombre_api != null && this.form.value.version_api != null && this.form.value.url_base != null && this.form.value.descripcion_api != null){
      this.dataService
      .postAPI({
        nombre_api: this.form.value.nombre_api,
        version_api:this.form.value.version_api,
        url_base:this.form.value.url_base,
        descripcion_api:this.form.value.descripcion_api
      })
      .subscribe((response) => {
        console.log(response);
      });
      this.form.reset();
      this.dialog.closeAll();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        didClose: ()=>{
          window.location.reload();
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'API was added successfully.'
      })
    }else{
      Swal.fire({
        title: 'Oops!',
        text: 'Please fill all fields.',
        icon: 'error',
        position: 'top',
        toast: true,
        background: 'lightgray',
      });
    }
  }
}
