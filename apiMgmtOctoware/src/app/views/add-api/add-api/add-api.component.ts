import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-api',
  templateUrl: './add-api.component.html',
  styleUrls: ['./add-api.component.css']
})
export class AddApiComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    nombre_api: ['', Validators.required],
    version_api: ['', Validators.required],
    url_base: ['', Validators.required],
    descripcion_api: ['', Validators.required]
  });
  constructor(private dataService: DataService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  }

  postAPI() {
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
  }
}
