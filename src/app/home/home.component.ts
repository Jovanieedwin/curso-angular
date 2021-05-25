import { Component, OnInit } from '@angular/core';
import { Series } from '../model/series.model';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../services/data.service';
import { SeriesService } from '../services/series.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // nombre descripcion Genero
  dataSource = new MatTableDataSource<Series>();
  columns = ['nombre', 'descripcion', 'genero', 'actions', 'delete'];

  constructor(private dataService: DataService, private series: SeriesService, private router: Router) {
    this.dataService.isLoading.next(true);
    this.series.getSeries().subscribe(series => {
      this.dataSource.data = series;
      this.dataService.isLoading.next(false);

    }, () => {
      this.dataService.isLoading.next(false);
      this.dataService.message.next("ocurrio un error al cargar los elementos ");
    });
  }

  edit(item: Series): void {
    console.log(item);
    this.router.navigate(['series', item._id]);
  }
  deleteElement(item: Series): void {
    console.log(item);

    this.series.deleteSeries(item).subscribe(() => {
      this.router.navigate(['series']);
      this.dataService.isLoading.next(false);
    }, err => {
      this.dataService.message.next("Ocurrio un error inesperado");
      this.dataService.isLoading.next(false);
    });
  }

    newItem(): void {
      this.router.navigate(['series']);
    }

    ngOnInit(): void {
    }

  }
