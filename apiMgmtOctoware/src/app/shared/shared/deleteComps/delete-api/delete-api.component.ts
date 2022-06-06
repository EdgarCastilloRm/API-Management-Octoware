import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-api',
  templateUrl: './delete-api.component.html',
  styleUrls: ['./delete-api.component.css']
})
export class DeleteAPIComponent implements OnInit {
  disabled = false;

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

  constructor(private api: DataService, private dialogRef: MatDialogRef<DeleteAPIComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  deleteWholeAPI() {
    this.api.deleteAPI(this.data.id_api)
    .subscribe({
      next: (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'API was deleted successfully.',
          color: '#FFFFFF',
          background: '#329B22',
          iconColor: '#FFFFFF'
        })
        this.dialogRef.close('save');
      },
      error: (err) =>{
        this.Toast.fire({
          icon: 'error',
          title: 'Error while deleting API.',
          color: '#FFFFFF',
          background: '#C71717',
          iconColor: '#FFFFFF'
        })
      }
    })
  }
}
