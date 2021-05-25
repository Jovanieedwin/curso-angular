import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Series } from '../model/series.model';
import { DataService } from '../services/data.service';
import { SeriesService } from '../services/series.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
  }
}
@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  formContact : FormGroup =  this.formBuilder.group({});
  matcher = new MyErrorStateMatcher();
  disableButton = false;
  id : string = '';
  title : string = "Crear elementos";

  constructor(    private formBuilder: FormBuilder,private dataService : DataService,private router:Router,private series : SeriesService,private activatedRoute : ActivatedRoute) {
    this.formContact = this.formBuilder.group({
      tipoTela:['',[Validators.required] ],
      marca:['',[Validators.required] ],
      tipo:['',[Validators.required] ]
    });
    this.dataService.isLoading.subscribe(isLoading => {
       this.disableButton = isLoading
    });

    this.activatedRoute.params.subscribe(parameters => {
      if(parameters.id){
        this.id = parameters.id;
        this.title = "Actualizar elemento";

        this.series.getSingleSeries(this.id).subscribe(item => {
          this.formContact.get("nombre")?.setValue(item.nombre),
          this.formContact.get("descripcion")?.setValue(item.descripcion),
          this.formContact.get("genero")?.setValue(item.genero)
        });
      }
    })
  }

  ngOnInit(): void {
  }

  save(): void {
    const data = {
      nombre: this.formContact.get("nombre")?.value,
      descripcion: this.formContact.get("descripcion")?.value,
      genero: this.formContact.get("genero")?.value
    } as Series;

    console.log(data);

    this.dataService.isLoading.next(true);

    this.series.saveSeries(data, this.id).subscribe(() => {
      this.router.navigate(['home']);
      this.dataService.isLoading.next(false);
    }, err => {
      this.dataService.message.next("Ocurrio un error inesperado");
      this.dataService.isLoading.next(false);
    });

  }
}
