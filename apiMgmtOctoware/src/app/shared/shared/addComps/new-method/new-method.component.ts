import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-method',
  templateUrl: './new-method.component.html',
  styleUrls: ['./new-method.component.css']
})
export class NewMethodComponent implements OnInit {
  actionBtn:string = "Save";
  titleText:string = "Add New Method";
  methodForm!: FormGroup;
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

  constructor(private fb: FormBuilder, private api: DataService, private dialogRef: MatDialogRef<NewMethodComponent>,  @Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {
    this.methodForm = this.fb.group({
      nombre_end: [null,Validators.required],
      url_end: [null,Validators.required],
      docum_end: [null,Validators.required],
      pruebas_end: null,
      expected_ans: null,
      id_tipo_end: [null,Validators.required]
    })

    if(this.editData.edit){
      this.titleText = "Update Method"
      this.actionBtn = "Update"
      this.methodForm.controls['nombre_end'].setValue(this.editData.cat.nombre_end);
      this.methodForm.controls['url_end'].setValue(this.editData.cat.url_end);
      this.methodForm.controls['docum_end'].setValue(this.editData.cat.docum_end);
      this.methodForm.controls['pruebas_end'].setValue(this.editData.cat.pruebas_end);
      this.methodForm.controls['expected_ans'].setValue(this.editData.cat.expected_ans);
      this.methodForm.controls['id_tipo_end'].setValue(this.editData.cat.id_tipo_end);
    }
  }

  addMethod(){
    if(!this.editData.edit){
      if(this.methodForm.valid){
        this.api.addMethod(this.methodForm.value, this.editData.id_cat)
        .subscribe({
          next: (res)=>{
            this.Toast.fire({
              icon: 'success',
              title: 'Method was added successfully.',
              color: '#FFFFFF',
              background: '#329B22',
              iconColor: '#FFFFFF'
            })
            this.methodForm.reset();
            this.dialogRef.close('save');
          },
          error: (err)=>{
            this.Toast.fire({
              icon: 'error',
              title: 'Error while adding Method.',
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
      if(this.methodForm.valid){
        this.api.putMethod(this.methodForm.value, this.editData.edit.id_end)
        .subscribe({
          next: (res)=>{
            this.Toast.fire({
              icon: 'success',
              title: 'Method was updated successfully.',
              color: '#FFFFFF',
              background: '#329B22',
              iconColor: '#FFFFFF'
            })
            this.methodForm.reset();
            this.dialogRef.close('save');
          },
          error: (err)=>{
            this.Toast.fire({
              icon: 'error',
              title: 'Error while updating Method.',
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
