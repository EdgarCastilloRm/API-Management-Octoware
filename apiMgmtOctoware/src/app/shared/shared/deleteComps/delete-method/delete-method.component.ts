import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { DeleteCatComponent } from '../delete-cat/delete-cat.component';

@Component({
  selector: 'app-delete-method',
  templateUrl: './delete-method.component.html',
  styleUrls: ['./delete-method.component.css']
})
export class DeleteMethodComponent implements OnInit {

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

  constructor(private api: DataService, private dialogRef: MatDialogRef<DeleteMethodComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  deleteMethod() {
    this.api.deleteMethod(this.data)
    .subscribe({
      next: (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'Method was deleted successfully.',
          color: '#FFFFFF',
          background: '#329B22',
          iconColor: '#FFFFFF'
        })
        this.dialogRef.close('save');
      },
      error: (err) =>{
        this.Toast.fire({
          icon: 'error',
          title: 'Error while deleting Method.',
          color: '#FFFFFF',
          background: '#C71717',
          iconColor: '#FFFFFF'
        })
      }
    })
  }

}
