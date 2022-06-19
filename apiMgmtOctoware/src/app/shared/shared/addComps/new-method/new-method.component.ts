import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-method',
  templateUrl: './new-method.component.html',
  styleUrls: ['./new-method.component.css'],
})
export class NewMethodComponent implements OnInit {
  actionBtn: string = 'Save';
  titleText: string = 'Add New Method';
  flag: boolean = false;
  methodForm!: FormGroup;
  paramForm!: FormGroup;
  responseForm!: FormGroup;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  constructor(
    private fb: FormBuilder,
    private api: DataService,
    private dialogRef: MatDialogRef<NewMethodComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.methodForm = this.fb.group({
      nombre_end: [null, Validators.required],
      url_end: [null, Validators.required],
      docum_end: [null, Validators.required],
      pruebas_end: null,
      expected_ans: null,
      id_tipo_end: [null, Validators.required],
      body: [null],
    });

    this.paramForm = this.fb.group({
      params: this.fb.array([]),
    });

    this.responseForm = this.fb.group({
      responses: this.fb.array([]),
    });

    if (this.editData.edit && this.editData.array) {
      this.titleText = 'Update Method';
      this.actionBtn = 'Update';
      this.flag = true;
      this.methodForm.controls['nombre_end'].setValue(
        this.editData.edit.nombre_end
      );
      this.methodForm.controls['url_end'].setValue(this.editData.edit.url_end);
      this.methodForm.controls['docum_end'].setValue(
        this.editData.edit.docum_end
      );
      this.methodForm.controls['pruebas_end'].setValue(
        this.editData.edit.pruebas_end
      );
      this.methodForm.controls['expected_ans'].setValue(
        this.editData.edit.expected_ans
      );
      this.methodForm.controls['body'].setValue(
        this.editData.edit.body
      );
      switch (this.editData.edit.tipo_end) {
        case 'GET':
          this.methodForm.controls['id_tipo_end'].setValue(1);
          break;
        case 'POST':
          this.methodForm.controls['id_tipo_end'].setValue(2);
          break;
        case 'PUT':
          this.methodForm.controls['id_tipo_end'].setValue(3);
          break;
        case 'DELETE':
          this.methodForm.controls['id_tipo_end'].setValue(4);
          break;
      }

      for (let index = 0; index < this.editData.array.length; index++) {
        var num = 0;
        switch (this.editData.array[index].tipo_param) {
          case 'string':
            num = 1;
            break;
          case 'int':
            num = 2;
            break;
          case 'bool':
            num = 3;
            break;
        }
        this.params.push(
          this.fb.group({
            nombre_param: [
              this.editData.array[index].nombre_param,
              Validators.required,
            ],
            obligatorio_param: [
              this.editData.array[index].obligatorio_param,
              Validators.required,
            ],
            id_tipo_param: [num, Validators.required],
            query: [this.editData.array[index].query, Validators.required],
          })
        );
      }

      for (let index = 0; index < this.editData.array2.length; index++) {
        var num = 0;
        switch (this.editData.array2[index].tipo_param) {
          case 'string':
            num = 1;
            break;
          case 'int':
            num = 2;
            break;
          case 'bool':
            num = 3;
            break;
        }
        this.responses.push(
          this.fb.group({
            name_resp: [
              this.editData.array2[index].name_resp,
              Validators.required,
            ],
            id_tipo_param: [num, Validators.required],
          })
        );
      }
    }
  }

  addMethod() {
    if (!this.editData.edit) {
      if (this.methodForm.valid) {
        this.api
          .addMethod(this.methodForm.value, this.editData.id_cat)
          .subscribe({
            next: (res) => {
              this.Toast.fire({
                icon: 'success',
                title: 'Method was added successfully.',
                color: '#FFFFFF',
                background: '#329B22',
                iconColor: '#FFFFFF',
              });
              this.methodForm.reset();
              this.dialogRef.close('save');
            },
            error: (err) => {
              this.Toast.fire({
                icon: 'error',
                title: 'Error while adding Method.',
                color: '#FFFFFF',
                background: '#C71717',
                iconColor: '#FFFFFF',
              });
            },
          });
      } else {
        this.Toast.fire({
          icon: 'error',
          title: 'Please fill all fields.',
          color: '#FFFFFF',
          background: '#C71717',
          iconColor: '#FFFFFF',
        });
      }
    } else {
      if (this.methodForm.valid) {
        this.api
          .putMethod(this.methodForm.value, this.editData.edit.id_end)
          .subscribe({
            next: (res) => {
              this.Toast.fire({
                icon: 'success',
                title: 'Method was updated successfully.',
                color: '#FFFFFF',
                background: '#329B22',
                iconColor: '#FFFFFF',
              });
              this.methodForm.reset();
              this.dialogRef.close('save');
            },
            error: (err) => {
              this.Toast.fire({
                icon: 'error',
                title: 'Error while updating Method.',
                color: '#FFFFFF',
                background: '#C71717',
                iconColor: '#FFFFFF',
              });
            },
          });
      } else {
        this.Toast.fire({
          icon: 'error',
          title: 'Please fill all fields.',
          color: '#FFFFFF',
          background: '#C71717',
          iconColor: '#FFFFFF',
        });
      }
    }
  }

  get params() {
    return this.paramForm.get('params') as FormArray;
  }

  get responses() {
    return this.responseForm.get('responses') as FormArray;
  }

  addParam() {
    const form = this.fb.group({
      nombre_param: [null, Validators.required],
      obligatorio_param: [false, Validators.required],
      id_tipo_param: [null, Validators.required],
      query: [false, Validators.required],
    });

    this.params.push(form);
  }

  removeParam(i: number) {
    this.params.removeAt(i);

    this.api.deleteParam(this.editData.array[i].id_param).subscribe({
      next: (res) => {
        this.Toast.fire({
          icon: 'success',
          title: 'Param was deleted successfully.',
          color: '#FFFFFF',
          background: '#329B22',
          iconColor: '#FFFFFF',
        });
        this.params.removeAt(i);
      },
      error: (err) => {
        this.Toast.fire({
          icon: 'error',
          title: 'Error while deleting Param.',
          color: '#FFFFFF',
          background: '#C71717',
          iconColor: '#FFFFFF',
        });
      },
    });
  }

  saveParam(i: number) {
    if (!this.editData.array[i]) {
      if (this.params.at(i).valid) {
        this.api
          .addParam(this.params.at(i).value, this.editData.edit.id_end)
          .subscribe({
            next: (res) => {
              this.Toast.fire({
                icon: 'success',
                title: 'Param was added successfully.',
                color: '#FFFFFF',
                background: '#329B22',
                iconColor: '#FFFFFF',
              });
            },
            error: (err) => {
              this.Toast.fire({
                icon: 'error',
                title: 'Error while adding Param.',
                color: '#FFFFFF',
                background: '#C71717',
                iconColor: '#FFFFFF',
              });
            },
          });
      } else {
        this.Toast.fire({
          icon: 'error',
          title: 'Please fill all fields.',
          color: '#FFFFFF',
          background: '#C71717',
          iconColor: '#FFFFFF',
        });
      }
    } else {
      if (this.params.at(i).valid) {
        this.api
          .putParam(this.params.at(i).value, this.editData.array[i].id_param)
          .subscribe({
            next: (res) => {
              this.Toast.fire({
                icon: 'success',
                title: 'Param was updated successfully.',
                color: '#FFFFFF',
                background: '#329B22',
                iconColor: '#FFFFFF',
              });
            },
            error: (err) => {
              this.Toast.fire({
                icon: 'error',
                title: 'Error while updating Param.',
                color: '#FFFFFF',
                background: '#C71717',
                iconColor: '#FFFFFF',
              });
            },
          });
      } else {
        this.Toast.fire({
          icon: 'error',
          title: 'Please fill all fields.',
          color: '#FFFFFF',
          background: '#C71717',
          iconColor: '#FFFFFF',
        });
      }
    }
  }

  addResponse() {
    const form2 = this.fb.group({
      name_resp: [null, Validators.required],
      id_tipo_param: [null, Validators.required],
    });

    this.responses.push(form2);
  }

  removeResponse(i: number) {
    this.api
      .deleteResponse(this.editData.array2[i].id_respuestas_end)
      .subscribe({
        next: (res) => {
          this.Toast.fire({
            icon: 'success',
            title: 'Response was deleted successfully.',
            color: '#FFFFFF',
            background: '#329B22',
            iconColor: '#FFFFFF',
          });
          this.responses.removeAt(i);
        },
        error: (err) => {
          this.Toast.fire({
            icon: 'error',
            title: 'Error while deleting Response.',
            color: '#FFFFFF',
            background: '#C71717',
            iconColor: '#FFFFFF',
          });
        },
      });
  }

  saveResponse(i: number) {
    if (!this.editData.array2[i]) {
      if (this.responses.at(i).valid) {
        this.api
          .addResponse(this.responses.at(i).value, this.editData.edit.id_end)
          .subscribe({
            next: (res) => {
              this.Toast.fire({
                icon: 'success',
                title: 'Response was added successfully.',
                color: '#FFFFFF',
                background: '#329B22',
                iconColor: '#FFFFFF',
              });
            },
            error: (err) => {
              this.Toast.fire({
                icon: 'error',
                title: 'Error while adding Response.',
                color: '#FFFFFF',
                background: '#C71717',
                iconColor: '#FFFFFF',
              });
            },
          });
      } else {
        this.Toast.fire({
          icon: 'error',
          title: 'Please fill all fields.',
          color: '#FFFFFF',
          background: '#C71717',
          iconColor: '#FFFFFF',
        });
      }
    } else {
      if (this.responses.at(i).valid) {
        this.api
          .putResponse(
            this.responses.at(i).value,
            this.editData.array2[i].id_respuestas_end
          )
          .subscribe({
            next: (res) => {
              this.Toast.fire({
                icon: 'success',
                title: 'Response was updated successfully.',
                color: '#FFFFFF',
                background: '#329B22',
                iconColor: '#FFFFFF',
              });
            },
            error: (err) => {
              this.Toast.fire({
                icon: 'error',
                title: 'Error while updating Response.',
                color: '#FFFFFF',
                background: '#C71717',
                iconColor: '#FFFFFF',
              });
            },
          });
      } else {
        this.Toast.fire({
          icon: 'error',
          title: 'Please fill all fields.',
          color: '#FFFFFF',
          background: '#C71717',
          iconColor: '#FFFFFF',
        });
      }
    }
  }
}
