import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MunicipioDto } from '../../core/interfaces/municipio.dto';
import { MunicipioService } from '../../infrastructure/services/municipio.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly destroyRef = inject(DestroyRef);
  private readonly municipioService = inject(MunicipioService);

  public formGroup: FormGroup = new FormGroup({
    municipio: new FormControl(null, [Validators.required]),
    unidad: new FormControl("celsius", [Validators.required]),
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
    console.log(this.formGroup.value);
  }

}
