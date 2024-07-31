import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UnidadTemperatura } from '../../core/enums/unidad-temperatura.enum';
import { MunicipioDto } from '../../core/interfaces/municipio.dto';
import { PrediccionDto } from '../../core/interfaces/prediccion.dto';
import { MunicipioService } from '../../infrastructure/services/municipio.service';
import { PrediccionService } from '../../infrastructure/services/prediccion.service';

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
    TitleCasePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly destroyRef = inject(DestroyRef);
  private readonly municipioService = inject(MunicipioService);
  private readonly prediccionService = inject(PrediccionService);

  public weatherResponse!: PrediccionDto;

  // Tomorrow date
  public readonly tomorrowDate: Date = new Date(
    new Date().setDate(
      new Date().getDate() + 1
    )
  );

  public formGroup: FormGroup = new FormGroup({
    municipio: new FormControl({ id: "46235", nombre: "Sueca" }, [Validators.required]),
    unidad: new FormControl("celsius"),
  });

  public municipios!: MunicipioDto[];

  ngOnInit(): void {
    this.loadMunicipios();
    this.subscribeToMunicipioChanges();
  }

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

  private loadMunicipios(query?: string): void {
    this.municipioService.getMunicipiosByQuery(query ?? '')
      .pipe(
        takeUntilDestroyed(this.destroyRef))
      .subscribe((municipios: MunicipioDto[]) => {
        this.municipios = municipios;
      });
  }

  public sendForm(): void {
    if (this.formGroup.valid) {
      const municipio: MunicipioDto = this.formGroup.get('municipio')?.value;
      const unidadTemperatura: UnidadTemperatura = this.formGroup.get('unidad')?.value;
      this.prediccionService.getPrediccionByMunicipio(
        municipio.id, unidadTemperatura)
        .pipe(
          takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (prediccion) => {
            console.log("Predicción recibida", prediccion);
            this.weatherResponse = prediccion;
          },
        })
    }
  }

  public displayFn(municipio: MunicipioDto): string {
    return municipio?.nombre ?? '';
  }


}
