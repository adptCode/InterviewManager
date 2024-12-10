import { Component, ViewChild } from '@angular/core';
import { ListComponent } from './components/list/list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InterviewManager';
  @ViewChild('interviewList') interviewList!: ListComponent;

  onInterviewAdded(): void {
    this.interviewList.loadInterviews(); // Actualizamos la lista
  }
  
}
