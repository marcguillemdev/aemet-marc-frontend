import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UnidadTemperatura } from '../../core/enums/unidad-temperatura.enum';
import { MunicipioDto } from '../../core/interfaces/municipio.dto';
import { PrediccionDto } from '../../core/interfaces/prediccion.dto';
import { municipioPlaceholder, prediccionPlaceholder } from '../../core/placeholder/fake-prediccion.placeholder';
import { MunicipioService } from '../../core/services/municipio.service';
import { PrediccionService } from '../../core/services/prediccion.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    DatePipe,
    TitleCasePipe,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly destroyRef = inject(DestroyRef);
  private readonly municipioService = inject(MunicipioService);
  private readonly prediccionService = inject(PrediccionService);

  public weatherResponse: PrediccionDto = prediccionPlaceholder;

  // Tomorrow date
  public readonly tomorrowDate: Date = new Date(
    new Date().setDate(
      new Date().getDate() + 1
    )
  );

  public formGroup: FormGroup = new FormGroup({
    municipio: new FormControl({ id: "46235", nombre: "Sueca" }, [Validators.required]),
    unidad: new FormControl("G_CEL"),
  });

  public municipios!: MunicipioDto[];
  public weatherIcon = 'sunny';
  public municipioToDisplay = municipioPlaceholder;

  ngOnInit(): void {
    this.loadMunicipios();
    this.subscribeToMunicipioChanges();
  }

  /**
   * @description Updates the weather icon based on the response.
   * @param prediccion Prediccion response.
   */
  private updateWeatherIcon(prediccion: PrediccionDto): void {
    const municipioHasRain: boolean = prediccion.probabilidadPrecipitacion
      .some((probabilidad) => probabilidad.probabilidad > 0);
    if (municipioHasRain) {
      this.weatherIcon = 'rainy';
    } else {
      this.weatherIcon = 'sunny';
    }
  }

  /**
   * @description Search for municipios based on the query. 
   * We apply a debounce time of 400ms to avoid making too many requests.
   */
  private subscribeToMunicipioChanges(): void {
    this.formGroup.get('municipio')?.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(400),
        distinctUntilChanged())
      .subscribe((query: string) => {
        this.loadMunicipios(query);
      });
  }

  /**
   * @description Loads municipios based on the query. If no query is provided, it will load all municipios.
   * @param query Municipio to search. Optional.
   */
  private loadMunicipios(query?: string): void {
    this.municipioService.getMunicipiosByQuery(query ?? '')
      .pipe(
        takeUntilDestroyed(this.destroyRef))
      .subscribe((municipios: MunicipioDto[]) => {
        this.municipios = municipios;
      });
  }

  /**
   * @description Sends the form and get the weather response. 
   * Then assign the response to the weatherResponse property and update the weather icon.
   */
  public sendForm(): void {
    if (this.formGroup.valid) {
      console.log("Formulario válido", this.formGroup.value);
      const municipio: MunicipioDto = this.formGroup.get('municipio')?.value;
      this.municipioToDisplay = municipio.nombre;
      const unidadTemperatura: UnidadTemperatura = this.formGroup.get('unidad')?.value;
      this.prediccionService.getPrediccionByMunicipio(
        municipio.id, unidadTemperatura)
        .pipe(
          takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (prediccion: PrediccionDto) => {
            console.log("Predicción recibida", prediccion);
            this.weatherResponse = prediccion;
            this.updateWeatherIcon(prediccion);
          },
        })
    }
  }

  /**
   * @description Display function for the autocomplete input.
   * @param municipio Municipio to display.
   * @returns Municipio name.
   */
  public displayFn(municipio: MunicipioDto): string {
    return municipio?.nombre ?? '';
  }


}
