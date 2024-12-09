import { Injectable } from '@angular/core';
import { Interview } from '../models/interview.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private interviews: Interview[] = []; // Array para almacenar todas las entrevistas

  constructor() {}

  /**
   * Obtiene todas las entrevistas almacenadas.
   * @returns {Interview[]} Array de entrevistas.
   */
  getInterviews(): Interview[] {
    return this.interviews;
  }

  /**
   * Agrega una nueva entrevista, evitando duplicados del mismo tipo para el mismo email.
   * @param {Interview} interview - Entrevista a agregar.
   */
  addInterview(interview: Interview): void {
    const exists = this.interviews.some(
      (i) => i.email === interview.email && i.type === interview.type
    );
    if (!exists) {
      this.interviews.push(interview);
    }
  }

  /**
   * Obtiene las entrevistas filtradas por tipo.
   * @param {'Primera entrevista' | 'Segunda entrevista'} type - Tipo de entrevista.
   * @returns {Interview[]} Array de entrevistas filtradas.
   */
  getInterviewsByType(type: 'Primera entrevista' | 'Segunda entrevista'): Interview[] {
    return this.interviews.filter((interview) => interview.type === type);
  }

  /**
   * Verifica si un candidato ha completado ambas entrevistas.
   * @param {string} email - Email del candidato.
   * @returns {boolean} True si ambas entrevistas están completadas.
   */
  hasBothInterviews(email: string): boolean {
    const types = this.interviews
      .filter((interview) => interview.email === email)
      .map((interview) => interview.type);
    return types.includes('Primera entrevista') && types.includes('Segunda entrevista');
  }
}

