import { Component, OnInit } from '@angular/core';
import { Interview } from 'src/app/models/interview.model';
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
   * Filtra las entrevistas según el tipo seleccionado.
   * @returns {Interview[]} Array de entrevistas filtradas.
   */
  getFilteredInterviews(): Interview[] {
    if (this.selectedFilter === 'primera') {
      return this.interviews.filter((interview) => interview.type === 'Primera entrevista');
    }
    if (this.selectedFilter === 'segunda') {
      return this.interviews.filter((interview) => interview.type === 'Segunda entrevista');
    }
    return this.interviews; // Todos los registros
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
