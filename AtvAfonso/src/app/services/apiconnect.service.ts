import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

type Car = {
  mes: string;
  descricao: string;
  quantidade_atestados: number;
};

@Injectable({
  providedIn: 'root',
})
export class ApiconnectService {
  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCars(): Observable<HttpResponse<Car[]>> {
    return this.http.get<any>(`${this.BASE_URL}`, {
      observe: 'response',
    });
  }
}
