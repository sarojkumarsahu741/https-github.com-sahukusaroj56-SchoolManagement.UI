import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table'; // Import PrimeNG Table
import { PaginatorModule } from 'primeng/paginator'; // Import PrimeNG Paginator
import { ButtonModule } from 'primeng/button'; // For PrimeNG Buttons if you choose to use them
import { InputTextModule } from 'primeng/inputtext'; // For PrimeNG Input fields if you choose to use them
import { DropdownModule } from 'primeng/dropdown'; // For PrimeNG Dropdown
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    InputTextModule,
    DropdownModule
  ],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  @Input() students: Student[] = [];
  @Output() edit = new EventEmitter<Student>();
  @Output() delete = new EventEmitter<string>(); // Emits rollNum for deletion

  // PrimeNG table state
  rows: number = 10; // Number of rows per page
  first: number = 0; // Index of the first record (for pagination)

  // Columns for PrimeNG Table
  cols: any[] = [
    { field: 'no', header: 'No', width: '10%' },
    { field: 'name', header: 'Students', width: '20%' },
    { field: 'rollNum', header: 'Roll num', width: '15%' },
    { field: 'class', header: 'Class', width: '10%' },
    { field: 'accomType', header: 'Accom. Type', width: '15%' },
    { field: 'transport', header: 'Transport', width: '10%' },
    { field: 'location', header: 'Location', width: '20%' },
    { field: 'contact', header: 'Contact', width: '20%' },
    { field: 'rank', header: 'Rank', width: '10%' },
    { field: 'points', header: 'Points', width: '10%' }
  ];

  onEdit(student: Student) {
    this.edit.emit(student);
  }

  onDelete(rollNum: string) {
    this.delete.emit(rollNum);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
