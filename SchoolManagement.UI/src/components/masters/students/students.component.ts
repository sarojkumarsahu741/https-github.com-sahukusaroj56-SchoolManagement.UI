import { CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { StudentFormComponent } from './components/student-form/student-form.component';
// StudentListComponent is being replaced by AppGridComponent, so no longer needed here
// import { StudentListComponent } from './components/student-list/student-list.component';
import { GridComponent } from '../../../shared/grid/grid.component'; // Assuming app-grid location
import { StudentService } from '../../../app/services/student.service';
import { Student } from './models/student.model';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import {ColumnType, GridColumnVM} from '../../../models/grid-column-vm.model'; // For custom confirmation dialog
import { GridActionVM } from '../../../models/grid-action-vm.model';

// Define an interface for your app-grid's column configuration
// Make sure this matches what your actual AppGridComponent expects
interface GridColumn {
  field: string;
  header: string;
  sortable?: boolean;
  type?: 'text' | 'image' | 'action' | 'checkbox'; // Add types based on your grid capabilities
  actions?: { icon: string; event: string }[];
  // Add any other properties your app-grid's column definition might have (e.g., width, format)
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    GridComponent,

    StudentFormComponent,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DialogModule
  ],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  showStudentForm: boolean = false;
  selectedStudent: Student | null = null; // For editing

  // Properties for AppGridComponent
  columns: GridColumnVM[] = [];
  searchText: string = ''; // Bound to the search input
  showLoader: boolean = false; // To show/hide loading spinner for grid operations
  sortBy: string = 'no'; // Default sort field
  sortDirection: 'asc' | 'desc' = 'asc'; // Default sort direction
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  gridActions: ({ icon: string; label: string; command: (rowData: Student) => any } | {
    icon: string;
    label: string;
    command: (rowData: Student) => void
  } | { icon: string; label: string; command: (rowData: Student) => void })[] = [];

  // Properties for custom delete confirmation dialog
  showConfirmDialog: boolean = false;
  studentToDelete: Student | null = null;

  @Output() toggleSidebar = new EventEmitter<unknown>();

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    // Define the columns for the app-grid
    this.columns = [
      { field: 'no', name: 'No', hide: false, isSortEnabled: true, columnType: ColumnType.Text },
      { field: 'name', name: 'Students', hide: false, isSortEnabled: true, columnType: ColumnType.Image },
      { field: 'rollNum', name: 'Roll num', hide: false, isSortEnabled: true, columnType: ColumnType.Text },
      { field: 'className', name: 'Class', hide: false, isSortEnabled: true, columnType: ColumnType.Text },
      { field: 'accomType', name: 'Accom._Type', hide: false, isSortEnabled: true, columnType: ColumnType.Text },
      { field: 'transport', name: 'Transport', hide: false, isSortEnabled: true, columnType: ColumnType.Text },
      { field: 'location', name: 'Location', hide: false, isSortEnabled: true, columnType: ColumnType.Text },
      { field: 'contact', name: 'Contact', hide: false, isSortEnabled: true, columnType: ColumnType.Text },
      { field: 'rank', name: 'Rank', hide: false, isSortEnabled: true, columnType: ColumnType.Text },
      { field: 'points', name: 'Points', hide: false, isSortEnabled: true, columnType: ColumnType.Text },

    ];
    this.gridActions = [
      { label: 'View', icon: 'pi pi-eye', command: (rowData: Student) => this.onViewStudent(rowData) },
      { label: 'Edit', icon: 'pi pi-pencil', command: (rowData: Student) => this.onEditStudent(rowData) },
      { label: 'Delete', icon: 'pi pi-trash', command: (rowData: Student) => this.confirmDelete(rowData) }
    ];

    this.loadStudents();
  }

  loadStudents(): void {
    this.showLoader = true; // Show loader before fetching data
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.totalRecords = data.length; // Set total records for pagination
      this.showLoader = false; // Hide loader after data is loaded
    }, error => {
      console.error('Error loading students:', error);
      this.showLoader = false; // Hide loader even if there's an error
    });
  }

  onBackArrowClick(): void {
    this.toggleSidebar.emit(); // Emit the event to toggle the sidebar
  }

  onAddNewStudent(): void {
    this.selectedStudent = null; // Clear any previously selected student
    this.showStudentForm = true;
    console.log('Add New Student clicked');
  }

  onFormSubmit(student: Student): void {
    if (this.selectedStudent) {
      this.studentService.updateStudent(student).subscribe(() => {
        this.loadStudents();
        this.showStudentForm = false;
        console.log('Student updated:', student);
      }, error => {
        console.error('Error updating student:', error);
      });
    } else {
      this.studentService.addStudent(student).subscribe(() => {
        this.loadStudents();
        this.showStudentForm = false;
        console.log('Student added:', student);
      }, error => {
        console.error('Error adding student:', error);
      });
    }
  }

  onEditStudent(student: Student): void {
    this.selectedStudent = { ...student }; // Create a copy to prevent direct mutation
    this.showStudentForm = true;
    console.log('Editing student:', student);
  }

  // Modified onDeleteStudent to use a custom confirmation dialog
  onDeleteStudent(rollNum: string): void {
    // This method is now triggered by the confirmation dialog
    this.studentService.deleteStudent(rollNum).subscribe(() => {
      this.loadStudents();
      console.log('Student deleted:', rollNum);
    }, error => {
      console.error('Error deleting student:', error);
    });
  }

  // Method to open the custom confirmation dialog
  confirmDelete(student: Student): void {
    this.studentToDelete = student;
    this.showConfirmDialog = true;
  }

  // Method to proceed with deletion after confirmation
  proceedDelete(): void {
    if (this.studentToDelete && this.studentToDelete.rollNum) {
      this.onDeleteStudent(this.studentToDelete.rollNum);
    }
    this.cancelDelete(); // Close the dialog
  }

  // Method to cancel deletion
  cancelDelete(): void {
    this.showConfirmDialog = false;
    this.studentToDelete = null;
  }

  onCancelForm(): void {
    this.showStudentForm = false;
    this.selectedStudent = null;
    console.log('Form cancelled');
  }

  // --- Event Handlers for app-grid ---
  handleGridEvent(event: any): void {
    console.log('app-grid event received:', event);
    switch (event.type) {
      case 'search':
        this.searchText = event.searchText;
        this.pageNumber = 1; // Reset page on search
        // You'll need to implement actual search filtering here or in your service
        this.loadStudents(); // Reload students with new search text
        break;
      case 'sort':
        this.sortBy = event.field;
        this.sortDirection = event.direction;
        this.pageNumber = 1; // Reset page on sort
        // You'll need to implement actual sorting here or in your service
        this.loadStudents(); // Reload students with new sort parameters
        break;
      case 'pageChange':
        this.pageNumber = event.pageNumber;
        this.pageSize = event.pageSize;
        this.loadStudents(); // Reload students for the new page
        break;
      case 'action':
        if (event.action === 'edit') {
          this.onEditStudent(event.data);
        } else if (event.action === 'delete') {
          this.confirmDelete(event.data); // Open custom confirmation dialog
        } else if (event.action === 'more') {
          console.log('More action for student:', event.data);
          // Implement logic for 'more' action, e.g., navigate to detail page
        }
        break;
      default:
        console.warn('Unhandled grid event type:', event.type);
    }
  }

  onFullscreenToggle(isFullScreen: boolean): void {
    // Implement logic to toggle fullscreen for the entire student view if needed
    console.log('Fullscreen mode toggled:', isFullScreen);
    // You might emit this to a parent component or a global service
  }

  private onViewStudent(rowData: Student) {
    return undefined;
  }
}
