import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

interface Options {
  value : number;
  viewValue: string;
}

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent implements OnInit {
  form !: FormGroup;
  options : Options[] = [
    {value: 1, viewValue: "User"},
    {value: 2, viewValue: "Admin"},
  ]; 

  optionsControl = new FormControl();
  selected = "";

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  constructor(@Inject(MAT_DIALOG_DATA) public id: any, private formBuilder: FormBuilder, private _dataService : DataService, private dialogRef : MatDialogRef<EditPopupComponent>) { 
    this.form = new FormGroup({
      id_tipo_usr: this.optionsControl
    });
  }

  ngOnInit(): void {
  }

  editRole() {
    if(this.form.valid){
      this._dataService.changeUserRole(this.id.id_usr, this.form.value)
      .subscribe({
        next: (res) =>{
          this.Toast.fire({
            icon: 'success',
            title: 'User role update successful',
            color: '#FFFFFF',
            background: '#329B22',
            iconColor: '#FFFFFF'
          })
          this.form.reset();
          this.dialogRef.close('save');
        },
        error: (err)=>{
          this.Toast.fire({
            icon: 'error',
            title: 'Error while updating Role.',
            color: '#FFFFFF',
            background: '#C71717',
            iconColor: '#FFFFFF'
          })
        }
      })
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'Please select an option.',
        color: '#FFFFFF',
        background: '#C71717',
        iconColor: '#FFFFFF'
      })
    }
  }
}
