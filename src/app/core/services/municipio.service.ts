import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MunicipioDto } from '../interfaces/municipio.dto';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private readonly httpClient = inject(HttpClient);

  public getMunicipiosByQuery(query: string): Observable<MunicipioDto[]> {
    const url: string = environment.backend.baseUrl + environment.backend.routes.municipios.base + environment.backend.routes.municipios.busqueda;
    const params = { municipio: query };
    return this.httpClient.get<MunicipioDto[]>(url, { params: params });
  }

}
