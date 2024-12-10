import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interview } from 'src/app/models/interview.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() interviewAdded = new EventEmitter<void>();

  form!: FormGroup;
  selectedType: 'Primera entrevista' | 'Segunda entrevista' = 'Primera entrevista';

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]{2,50}$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]{2,50}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      phone: ['', [Validators.pattern(/^\+?[0-9]{9,15}$/)]],
      physicalDescription: [''],
      skillsDescription: [''],
      technicalQuestionsScore: [null],
      technicalTestScore: [null]
    });
  }

  // Cambia el tipo de formulario según la selección del usuario
  onTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      this.selectedType = target.value as 'Primera entrevista' | 'Segunda entrevista';
      this.updateFormFields();
      this.cdr.detectChanges(); // Actualiza la vista del componente
    } else {
      console.error('Event target is null or not an HTMLSelectElement');
    }
  }

   // Actualiza las validaciones de los campos dependiendo del tipo seleccionado
   updateFormFields(): void {
    if (this.selectedType === 'Primera entrevista') {
      this.form.get('physicalDescription')?.setValidators([]);
      this.form.get('skillsDescription')?.setValidators([]);
      this.form.get('technicalQuestionsScore')?.clearValidators();
      this.form.get('technicalQuestionsScore')?.setValue(null);
    } else {
      this.form.get('technicalQuestionsScore')?.setValidators([Validators.required]);
      this.form.get('physicalDescription')?.clearValidators();
    }
    this.form.updateValueAndValidity();
  }

  // Devuelve si un campo tiene errores y el tipo de error
  hasErrors(field: string, typeError: string) {
    return (
      this.form.get(field)?.hasError(typeError) && this.form.get(field)?.touched
    );
  }


  // Envía los datos del formulario si son válidos
  onSubmit(): void {
    if (this.form.valid) {
      const interview: Interview = {
        ...this.form.value,
        type: this.selectedType
      };
      this.storageService.addInterview(interview);
      console.log('Entrevista guardada:', interview);
      this.form.reset();
      this.selectedType = 'Primera entrevista'; // Repristina el tipo de entrevista
      this.updateFormFields(); // Actualiza las validaciones de los campos
      this.interviewAdded.emit(); // Emitimos el evento para actualizar la lista
    } else {
      console.error('Formulario inválido');
      this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar los errores
    }
  }

}
