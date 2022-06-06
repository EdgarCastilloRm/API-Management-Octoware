import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  catForm !: FormGroup;
  titleText : string = "Add a New Category";
  actionBtn : string = "Save";
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

  apiIdFromRoute!: Number;

  constructor(private formBuilder: FormBuilder, private api: DataService, private dialogRef: MatDialogRef<EditCategoryComponent>, @Inject(MAT_DIALOG_DATA) data: {route: ActivatedRoute}, @Inject(MAT_DIALOG_DATA) public editData:any) { 
    if(data.route){
      data.route.params.subscribe(params => {this.apiIdFromRoute = params['id_api']});
    }
  }

  ngOnInit(): void {
    this.catForm =  this.formBuilder.group({
      nombre_cat: [null,Validators.required]
    });

    if(this.editData.cat){
      this.titleText = "Update Category name"
      this.actionBtn = "Update"
      this.catForm.controls['nombre_cat'].setValue(this.editData.cat.nombre_cat);
    }
  }

  addCategory(){
    if(!this.editData.cat){
      if(this.catForm.valid){
        this.api.postCategory(this.catForm.value, this.apiIdFromRoute)
        .subscribe({
          next: (res)=>{
            this.Toast.fire({
              icon: 'success',
              title: 'Category was added successfully.',
              color: '#FFFFFF',
              background: '#329B22',
              iconColor: '#FFFFFF'
            })
            this.catForm.reset();
            this.dialogRef.close('save');
          },
          error: (err)=>{
            this.Toast.fire({
              icon: 'error',
              title: 'Error while adding Category.',
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
      if(this.catForm.valid){
        this.api.putCategoryName(this.catForm.value, this.editData.cat.id_cat)
        .subscribe({
          next: (res)=>{
            this.Toast.fire({
              icon: 'success',
              title: 'Category was updated successfully.',
              color: '#FFFFFF',
              background: '#329B22',
              iconColor: '#FFFFFF'
            })
            this.catForm.reset();
            this.dialogRef.close('save');
          },
          error: (err)=>{
            this.Toast.fire({
              icon: 'error',
              title: 'Error while updating Category.',
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
