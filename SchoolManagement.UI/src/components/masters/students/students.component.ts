import { CommonModule } from "@angular/common";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { StudentFormComponent } from "./components/student-form/student-form.component";
import { StudentService } from "../../../app/services/student.service";
import { Student } from "./models/student.model";

// PrimeNG Imports
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DialogModule } from "primeng/dialog";
import { TooltipModule } from "primeng/tooltip";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-students",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StudentFormComponent,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  showStudentForm: boolean = false;
  selectedStudent: Student | null = null;
  searchValue: string = "";
  loading: boolean = false;

  @Output() toggleSidebar = new EventEmitter<unknown>();

  constructor(
    private studentService: StudentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.filteredStudents = [...data];
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading students:", error);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to load students",
        });
        this.loading = false;
      },
    });
  }

  onSearch(): void {
    if (!this.searchValue.trim()) {
      this.filteredStudents = [...this.students];
      return;
    }

    const searchTerm = this.searchValue.toLowerCase().trim();
    this.filteredStudents = this.students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.rollNum.toLowerCase().includes(searchTerm) ||
        student.className.toLowerCase().includes(searchTerm),
    );
  }

  onAddNewStudent(): void {
    this.selectedStudent = null;
    this.showStudentForm = true;
  }

  viewStudent(student: Student): void {
    console.log("Viewing student:", student);
    this.messageService.add({
      severity: "info",
      summary: "View Student",
      detail: `Viewing details for ${student.name}`,
    });
  }

  editStudent(student: Student): void {
    this.selectedStudent = { ...student };
    this.showStudentForm = true;
  }

  deleteStudent(student: Student): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${student.name}?`,
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.studentService.deleteStudent(student.rollNum).subscribe({
          next: () => {
            this.loadStudents();
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Student deleted successfully",
            });
          },
          error: (error) => {
            console.error("Error deleting student:", error);
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Failed to delete student",
            });
          },
        });
      },
    });
  }

  onFormSubmit(student: Student): void {
    if (this.selectedStudent) {
      // Update existing student
      this.studentService.updateStudent(student).subscribe({
        next: () => {
          this.loadStudents();
          this.showStudentForm = false;
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Student updated successfully",
          });
        },
        error: (error) => {
          console.error("Error updating student:", error);
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to update student",
          });
        },
      });
    } else {
      // Add new student
      this.studentService.addStudent(student).subscribe({
        next: () => {
          this.loadStudents();
          this.showStudentForm = false;
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Student added successfully",
          });
        },
        error: (error) => {
          console.error("Error adding student:", error);
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to add student",
          });
        },
      });
    }
  }

  onCancelForm(): void {
    this.showStudentForm = false;
    this.selectedStudent = null;
  }

  onBackArrowClick(): void {
    this.toggleSidebar.emit();
  }
}
