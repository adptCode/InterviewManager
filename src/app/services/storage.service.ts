import { Injectable } from '@angular/core';
import { Interview } from '../models/interview.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private interviewsKey = 'interviews'; // Clave para identificar los datos en localStorage

  constructor() {
    this.loadInterviews(); // Cargar los datos de entrevistas al inicializar el servicio
  }

  private interviews: Interview[] = []; // Array para almacenar temporalmente las entrevistas en memoria

  /**
   *  Carga las entrevistas almacenadas en localStorage al inicializar el servicio.
   */
  private loadInterviews(): void {
    const data = localStorage.getItem(this.interviewsKey);
    if (data) {
      this.interviews = JSON.parse(data); // Convertimos los datos almacenados a un array de entrevistas
    }
  }

  /**
   * Guarda las entrevistas actuales en localStorage
   */
  private saveInterviews(): void {
    localStorage.setItem(this.interviewsKey, JSON.stringify(this.interviews));
  }

  /**
   * Obtiene todas las entrevistas almacenadas en memoria.
   * @returns {Interview[]} Lista completa de entrevistas.
   */
  getInterviews(): Interview[] {
    return this.interviews;
  }

  /**
   * Agrega una nueva entrevista al array y la guarda en localStorage.
   * Si ya existe una entrevista del mismo tipo para el mismo email, la reemplaza.
   * @param {Interview} interview - Entrevista a agregar o reemplazar.
   */
  addInterview(interview: Interview): void {
    const index = this.interviews.findIndex(
      (i) => i.email === interview.email && i.type === interview.type
    );

    if (index !== -1) {
      // Reemplaza la entrevista existente
      this.interviews[index] = interview;
    } else {
      // Agrega una nueva entrevista
      this.interviews.push(interview);
    }

    this.saveInterviews(); // Guarda los cambios en localStorage
  }

  /**
   * Filtra las entrevistas según su tipo.
   * @param {'Primera entrevista' | 'Segunda entrevista'} type - Tipo de entrevista a filtrar.
   * @returns {Interview[]} Lista de entrevistas filtradas por tipo.
   */
  getInterviewsByType(
    type: 'Primera entrevista' | 'Segunda entrevista'
  ): Interview[] {
    return this.interviews.filter((interview) => interview.type === type);
  }

  /**
   * Verifica si un candidato ha completado ambos tipos de entrevistas.
   * @param {string} email - Email del candidato.
   * @returns {boolean} True si el candidato ha completado ambas entrevistas.
   */
  hasBothInterviews(email: string): boolean {
    const types = this.interviews
      .filter((interview) => interview.email === email)
      .map((interview) => interview.type);
    return (
      types.includes('Primera entrevista') &&
      types.includes('Segunda entrevista')
    );
  }
}
