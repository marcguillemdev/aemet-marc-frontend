import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { UnidadTemperatura } from '../enums/unidad-temperatura.enum';
import { PrediccionDto } from '../interfaces/prediccion.dto';

@Injectable({
  providedIn: 'root'
})
export class PrediccionService {

  private readonly httpClient = inject(HttpClient);

  public getPrediccionByMunicipio(municipioId: string, unidadTemperatura: UnidadTemperatura): Observable<PrediccionDto> {
    console.log("Enviando petición de predicción", municipioId, unidadTemperatura);
    const url: string = environment.backend.baseUrl + environment.backend.routes.prediccion.base + environment.backend.routes.prediccion.municipio;
    const params = { idMunicipio: municipioId, unidad: unidadTemperatura };
    return this.httpClient.get<PrediccionDto>(url, { params: params })
      .pipe(
        map((prediccion: PrediccionDto) => {
          prediccion.probabilidadPrecipitacion.map((probabilidad) => {
            probabilidad.autoGeneratedId = Math.floor(Math.random() * 1000000);
            return probabilidad;
          });
          return prediccion;
        })
      );
  }
}
