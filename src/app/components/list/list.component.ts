import { Component, OnInit } from '@angular/core';
import { Interview, CombinedInterview } from 'src/app/models/interview.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  interviews: Interview[] = []; // Todas las entrevistas
  selectedFilter: 'all' | 'primera' | 'segunda' = 'all'; // Filtro seleccionado

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadInterviews(); // Carga inicial de entrevistas
  }

  /**
   * Carga todas las entrevistas desde el servicio.
   */
  loadInterviews(): void {
    this.interviews = this.storageService.getInterviews();
  }

  /**
   * Obtiene las entrevistas combinadas por email cuando el filtro es "all".
   * @returns {CombinedInterview[]} Array de entrevistas combinadas.
   */
  getCombinedInterviews(): any[] {
    const combined: { [email: string]: CombinedInterview } = {};

    this.interviews.forEach((interview) => {
      if (!combined[interview.email]) {
        combined[interview.email] = {
          email: interview.email,
          name: interview.name,
          surname: interview.surname,
          phone: interview.phone,
          primera: null,
          segunda: null,
        };
      }

      if (interview.type === 'Primera entrevista') {
        combined[interview.email].primera = interview;
      } else if (interview.type === 'Segunda entrevista') {
        combined[interview.email].segunda = interview;
      }
    });

    return Object.values(combined);
  }

  /**
   * Filtra las entrevistas según el tipo seleccionado.
   * @returns {CombinedInterview[]} Array de entrevistas filtradas.
   */
  getFilteredInterviews(): CombinedInterview[] {
    if (this.selectedFilter === 'primera') {
      return this.interviews
        .filter((interview) => interview.type === 'Primera entrevista')
        .map((interview) => ({
          name: interview.name,
          surname: interview.surname,
          email: interview.email,
          phone: interview.phone,
          primera: interview,
          segunda: null,
        }));
    }
    if (this.selectedFilter === 'segunda') {
      return this.interviews
        .filter((interview) => interview.type === 'Segunda entrevista')
        .map((interview) => ({
          name: interview.name,
          surname: interview.surname,
          email: interview.email,
          phone: interview.phone,
          primera: null,
          segunda: interview,
        }));
    }
    return this.getCombinedInterviews(); // Devuelve las entrevistas combinadas para "all"
  }

  /**
   * Verifica si un candidato ha completado ambas entrevistas.
   * @param {string} email - Email del candidato.
   * @returns {boolean} True si ambas entrevistas están completadas.
   */
  hasBothInterviews(email: string): boolean {
    return this.storageService.hasBothInterviews(email);
  }

}
