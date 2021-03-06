import { getSupportedInputTypes } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Series } from '../model/series.model';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http : HttpClient) {  }

  getSeries():Observable<[Series]>{
    return this.http.get<[Series]>('https://super-rest.herokuapp.com/test/series/');
  }

  getSingleSeries(id: string): Observable<Series>{
    return this.http.get<Series>('https://super-rest.herokuapp.com/test/series/' + id);
  }
  saveSeries(item: Series,id?:string) :Observable<any>{
    if(id !== '') {
      return this.http.put('https://super-rest.herokuapp.com/test/series/'+id,item);
    }
    return this.http.post('https://super-rest.herokuapp.com/test/series/',item);
  }

  deleteSeries(item:Series):Observable<any> {
    return this.http.delete('https://super-rest.herokuapp.com/test/series/'+item._id);
  }

  }

