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

  form!: FormGroup; // Objeto para gestionar el formulario reactivo
  selectedType: 'Primera entrevista' | 'Segunda entrevista' = 'Primera entrevista'; // Tipo de entrevista seleccionada

  @Output() interviewAdded = new EventEmitter<void>(); // Evento para notificar cuando se agrega una nueva entrevista

  constructor(
    private fb: FormBuilder,  // Servicio para crear formularios reactivos
    private cdr: ChangeDetectorRef, // Servicio para forzar actualizaciones en la vista
    private storageService: StorageService // Servicio para gestionar entrevistas
  ) { }

  ngOnInit(): void {
    this.initializeForm(); // Inicializa el formulario al cargar el componente
  }

  /**
   * Inicializa el formulario con los campos requeridos y sus validaciones.
   */
  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]{2,50}$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]{2,50}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      phone: ['', [Validators.pattern(/^\+?[0-9]{9,15}$/)]],
      physicalDescription: [''], // No requerido
      skillsDescription: [''], // No requerido
      technicalQuestionsScore: [null], // Requerido solo en "Segunda entrevista"
      technicalTestScore: [null] // No requerido
    });
  }

  /**
   * Cambia el tipo de entrevista según la selección del usuario.
   * @param {Event} event - Evento del selector.
   */
  onTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      this.selectedType = target.value as 'Primera entrevista' | 'Segunda entrevista';
      this.updateFormFields(); // Actualiza las validaciones según el tipo seleccionado
      this.cdr.detectChanges(); // Forza la actualización de la vista
    } else {
      console.error('Event target is null or not an HTMLSelectElement');
    }
  }

   /**
   * Actualiza las validaciones de los campos según el tipo de entrevista seleccionado.
   */
   updateFormFields(): void {
    if (this.selectedType === 'Primera entrevista') {
      this.form.get('physicalDescription')?.setValidators([]); // Sin validaciones
      this.form.get('skillsDescription')?.setValidators([]); // Sin validaciones
      this.form.get('technicalQuestionsScore')?.clearValidators(); // Se limpia la validación
      this.form.get('technicalQuestionsScore')?.setValue(null); // Resetea el campo
    } else {
      this.form.get('technicalQuestionsScore')?.setValidators([Validators.required]); // Es requerido
      this.form.get('physicalDescription')?.clearValidators(); // Se limpia la validación
    }
    this.form.updateValueAndValidity();  // Actualiza el estado del formulario
  }

  /**
   * Verifica si un campo tiene errores y el tipo de error.
   * @param {string} field - Nombre del campo a verificar.
   * @param {string} typeError - Tipo de error a comprobar.
   * @returns {boolean} True si el campo tiene el error especificado.
   */
  hasErrors(field: string, typeError: string): boolean {
    return (
      (this.form.get(field)?.hasError(typeError) ?? false) && (this.form.get(field)?.touched ?? false)
    );
  }

  /**
   * Maneja el envío del formulario, validando y almacenando los datos en caso de éxito.
   */
  onSubmit(): void {
    if (this.form.valid) {
      const interview: Interview = {
        ...this.form.value,
        type: this.selectedType
      };
      this.storageService.addInterview(interview); // Agrega la entrevista al servicio

      this.form.reset(); // Resetea el formulario
      this.selectedType = 'Primera entrevista'; // Reestablece el tipo de entrevista
      this.updateFormFields(); // Actualiza las validaciones para "Primera entrevista"

      this.interviewAdded.emit(); // Emite un evento para notificar cambios
    } else {
      this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar los errores
    }
  }

}
