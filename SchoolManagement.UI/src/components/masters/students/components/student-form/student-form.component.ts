import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormsModule } from "@angular/forms"; // For ngModel
import { InputTextModule } from "primeng/inputtext"; // PrimeNG InputText
import { DropdownModule } from "primeng/dropdown"; // PrimeNG Dropdown
import { RadioButtonModule } from "primeng/radiobutton"; // PrimeNG RadioButton
import { ButtonModule } from "primeng/button"; // PrimeNG Button
import { CalendarModule } from "primeng/calendar"; // PrimeNG Calendar for Date of Birth
import { Student } from "../../models/student.model";

@Component({
  selector: "app-student-form",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    RadioButtonModule,
    ButtonModule,
    CalendarModule,
  ],
  templateUrl: "./student-form.component.html",
  styleUrls: ["./student-form.component.css"],
})
export class StudentFormComponent implements OnChanges {
  @Input() student: Student | null = null;
  @Output() formSubmit = new EventEmitter<Student>();
  @Output() cancel = new EventEmitter<void>();

  model: Student = {
    no: "",
    name: "",
    profilePic:
      "https://storage.googleapis.com/a1aa/image/80d6e9cf-3584-4a80-c39c-5e2d17b41a39.jpg", // Default
    rollNum: "",
    className: "",
    accomType: "Day Scholler", // Default selection
    transport: "Non Transport", // Default selection
    location: "",
    contact: "",
    rank: "",
    points: "",
    // Form specific fields
    firstName: "",
    lastName: "",
    gender: "Male",
    dateOfBirth: "",
    section: "",
    userName: "",
    password: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    pincode: "",
    state: "",
    fatherName: "",
    motherName: "",
    fatherContact: "",
    motherContact: "",
    fatherOccupation: "",
    annualIncome: 0,
  };

  genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  classes = [
    { label: "12 - A", value: "12 - A" },
    { label: "11 - B", value: "11 - B" },
    { label: "10 - C", value: "10 - C" },
  ];
  sections = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
  ];
  accommodationTypes = ["Day Scholler", "Hosteller"];
  transportOptions = ["Transport", "Non Transport"];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["student"] && this.student) {
      this.model = { ...this.student }; // Create a copy for the form
    } else if (changes["student"] && !this.student) {
      this.resetForm();
    }
  }

  onSubmit() {
    this.formSubmit.emit(this.model);
    // Form reset handled by parent component after submission
  }

  onCancel() {
    this.cancel.emit();
    this.resetForm();
  }

  resetForm() {
    this.model = {
      no: "",
      name: "",
      profilePic:
        "https://storage.googleapis.com/a1aa/image/80d6e9cf-3584-4a80-c39c-5e2d17b41a39.jpg",
      rollNum: "",
      className: "",
      accomType: "Day Scholler",
      transport: "Non Transport",
      location: "",
      contact: "",
      rank: "",
      points: "",
      firstName: "",
      lastName: "",
      gender: "Male",
      dateOfBirth: "",
      section: "",
      userName: "",
      password: "",
      phone: "",
      email: "",
      address: "",
      district: "",
      pincode: "",
      state: "",
      fatherName: "",
      motherName: "",
      fatherContact: "",
      motherContact: "",
      fatherOccupation: "",
      annualIncome: 0,
    };
  }
}
