import { CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core'; //
//import { Component, OnInit } from '@angular/core';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentService } from '../../../app/services/student.service';
import { Student } from './models/student.model';
import { ButtonModule } from 'primeng/button'; // For PrimeNG Button
import { InputTextModule } from 'primeng/inputtext'; // For PrimeNG Input for search

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    StudentListComponent,
    StudentFormComponent,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  showStudentForm: boolean = false;
  selectedStudent: Student | null = null; // For editing

  // Output event for toggling sidebar
  //@Output() toggleSidebar = new EventEmitter<void>(); //
  // Method to call when the back arrow button is clicked
  @Output() toggleSidebar = new EventEmitter<unknown>();
  onBackArrowClick() {
    this.toggleSidebar.emit(); // Emit the event
  }
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  onAddNewStudent() {
    this.selectedStudent = null; // Clear any previously selected student
    this.showStudentForm = true;
  }

  onFormSubmit(student: Student) {
    if (this.selectedStudent) {
      this.studentService.updateStudent(student).subscribe(() => {
        this.loadStudents();
        this.showStudentForm = false;
      });
    } else {
      this.studentService.addStudent(student).subscribe(() => {
        this.loadStudents();
        this.showStudentForm = false;
      });
    }
  }

  onEditStudent(student: Student) {
    this.selectedStudent = student;
    this.showStudentForm = true;
  }

  onDeleteStudent(rollNum: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(rollNum).subscribe(() => {
        this.loadStudents();
      });
    }
  }

  onCancelForm() {
    this.showStudentForm = false;
    this.selectedStudent = null;
  }
}
