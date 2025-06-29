import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from '../../../src/components/masters/students/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    {
      id: '1', no: '01', name: 'Sophia Wilson', rollNum: '5223cs009', className: '12', section: 'A', // Corrected 'class' to 'className'
      profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', // Added profilePic
      accomType: 'Hosteller', transport: 'No', location: 'Singanallur', contact: '82486 69086',
      rank: '001', points: '28980',
      firstName: 'Sophia', lastName: 'Wilson', gender: 'Female', dateOfBirth: '15/05/2007',
      fatherName: 'John Wilson', motherName: 'Jane Wilson', fatherContact: '9876543210',
      motherContact: '9876543211', fatherOccupation: 'Engineer', annualIncome: 500000,
      phone: '8248669086', email: 'sophia.w@example.com', address: '123 Main St',
      district: 'Coimbatore', pincode: '641001', state: 'Tamil Nadu'
    },
    {
      id: '2', no: '01', name: 'Sophia Wilson', rollNum: '5223cs009', className: '12', section: 'A', // Corrected 'class' to 'className'
      profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', // Added profilePic
      accomType: 'Hosteller', transport: 'No', location: 'Singanallur', contact: '82486 69086',
      rank: '001', points: '28980',
      firstName: 'Sophia', lastName: 'Wilson', gender: 'Female', dateOfBirth: '15/05/2007',
      fatherName: 'John Wilson', motherName: 'Jane Wilson', fatherContact: '9876543210',
      motherContact: '9876543211', fatherOccupation: 'Engineer', annualIncome: 500000,
      phone: '8248669086', email: 'sophia.w@example.com', address: '123 Main St',
      district: 'Coimbatore', pincode: '641001', state: 'Tamil Nadu'
    },
    {
      id: '3', no: '01', name: 'Sophia Wilson', rollNum: '5223cs009', className: '12', section: 'A', // Corrected 'class' to 'className'
      profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', // Added profilePic
      accomType: 'Hosteller', transport: 'No', location: 'Singanallur', contact: '82486 69086',
      rank: '001', points: '28980',
      firstName: 'Sophia', lastName: 'Wilson', gender: 'Female', dateOfBirth: '15/05/2007',
      fatherName: 'John Wilson', motherName: 'Jane Wilson', fatherContact: '9876543210',
      motherContact: '9876543211', fatherOccupation: 'Engineer', annualIncome: 500000,
      phone: '8248669086', email: 'sophia.w@example.com', address: '123 Main St',
      district: 'Coimbatore', pincode: '641001', state: 'Tamil Nadu'
    },
    {
      id: '4', no: '01', name: 'Sophia Wilson', rollNum: '5223cs009', className: '12', section: 'A', // Corrected 'class' to 'className'
      profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', // Added profilePic
      accomType: 'Hosteller', transport: 'No', location: 'Singanallur', contact: '82486 69086',
      rank: '001', points: '28980',
      firstName: 'Sophia', lastName: 'Wilson', gender: 'Female', dateOfBirth: '15/05/2007',
      fatherName: 'John Wilson', motherName: 'Jane Wilson', fatherContact: '9876543210',
      motherContact: '9876543211', fatherOccupation: 'Engineer', annualIncome: 500000,
      phone: '8248669086', email: 'sophia.w@example.com', address: '123 Main St',
      district: 'Coimbatore', pincode: '641001', state: 'Tamil Nadu'
    },
    {
      id: '5', no: '01', name: 'Sophia Wilson', rollNum: '5223cs009', className: '12', section: 'A', // Corrected 'class' to 'className'
      profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', // Added profilePic
      accomType: 'Hosteller', transport: 'No', location: 'Singanallur', contact: '82486 69086',
      rank: '001', points: '28980',
      firstName: 'Sophia', lastName: 'Wilson', gender: 'Female', dateOfBirth: '15/05/2007',
      fatherName: 'John Wilson', motherName: 'Jane Wilson', fatherContact: '9876543210',
      motherContact: '9876543211', fatherOccupation: 'Engineer', annualIncome: 500000,
      phone: '8248669086', email: 'sophia.w@example.com', address: '123 Main St',
      district: 'Coimbatore', pincode: '641001', state: 'Tamil Nadu'
    },
    {
      id: '6', no: '01', name: 'Sophia Wilson', rollNum: '5223cs009', className: '12', section: 'A', // Corrected 'class' to 'className'
      profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', // Added profilePic
      accomType: 'Hosteller', transport: 'No', location: 'Singanallur', contact: '82486 69086',
      rank: '001', points: '28980',
      firstName: 'Sophia', lastName: 'Wilson', gender: 'Female', dateOfBirth: '15/05/2007',
      fatherName: 'John Wilson', motherName: 'Jane Wilson', fatherContact: '9876543210',
      motherContact: '9876543211', fatherOccupation: 'Engineer', annualIncome: 500000,
      phone: '8248669086', email: 'sophia.w@example.com', address: '123 Main St',
      district: 'Coimbatore', pincode: '641001', state: 'Tamil Nadu'
    },
    {
      id: '7', no: '01', name: 'Sophia Wilson', rollNum: '5223cs009', className: '12', section: 'A', // Corrected 'class' to 'className'
      profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', // Added profilePic
      accomType: 'Hosteller', transport: 'No', location: 'Singanallur', contact: '82486 69086',
      rank: '001', points: '28980',
      firstName: 'Sophia', lastName: 'Wilson', gender: 'Female', dateOfBirth: '15/05/2007',
      fatherName: 'John Wilson', motherName: 'Jane Wilson', fatherContact: '9876543210',
      motherContact: '9876543211', fatherOccupation: 'Engineer', annualIncome: 500000,
      phone: '8248669086', email: 'sophia.w@example.com', address: '123 Main St',
      district: 'Coimbatore', pincode: '641001', state: 'Tamil Nadu'
    },
    {
      id: '8', no: '01', name: 'Sophia Wilson', rollNum: '5223cs009', className: '12', section: 'A', // Corrected 'class' to 'className'
      profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', // Added profilePic
      accomType: 'Hosteller', transport: 'No', location: 'Singanallur', contact: '82486 69086',
      rank: '001', points: '28980',
      firstName: 'Sophia', lastName: 'Wilson', gender: 'Female', dateOfBirth: '15/05/2007',
      fatherName: 'John Wilson', motherName: 'Jane Wilson', fatherContact: '9876543210',
      motherContact: '9876543211', fatherOccupation: 'Engineer', annualIncome: 500000,
      phone: '8248669086', email: 'sophia.w@example.com', address: '123 Main St',
      district: 'Coimbatore', pincode: '641001', state: 'Tamil Nadu'
    },
    {
      id: '9', no: '01', name: 'Sophia Wilson', rollNum: '5223cs009', className: '12', section: 'A', // Corrected 'class' to 'className'
      profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', // Added profilePic
      accomType: 'Hosteller', transport: 'No', location: 'Singanallur', contact: '82486 69086',
      rank: '001', points: '28980',
      firstName: 'Sophia', lastName: 'Wilson', gender: 'Female', dateOfBirth: '15/05/2007',
      fatherName: 'John Wilson', motherName: 'Jane Wilson', fatherContact: '9876543210',
      motherContact: '9876543211', fatherOccupation: 'Engineer', annualIncome: 500000,
      phone: '8248669086', email: 'sophia.w@example.com', address: '123 Main St',
      district: 'Coimbatore', pincode: '641001', state: 'Tamil Nadu'
    },
    {
      id: '10', no: '01', name: 'Sophia Wilson', rollNum: '5223cs009', className: '12', section: 'A', // Corrected 'class' to 'className'
      profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', // Added profilePic
      accomType: 'Hosteller', transport: 'No', location: 'Singanallur', contact: '82486 69086',
      rank: '001', points: '28980',
      firstName: 'Sophia', lastName: 'Wilson', gender: 'Female', dateOfBirth: '15/05/2007',
      fatherName: 'John Wilson', motherName: 'Jane Wilson', fatherContact: '9876543210',
      motherContact: '9876543211', fatherOccupation: 'Engineer', annualIncome: 500000,
      phone: '8248669086', email: 'sophia.w@example.com', address: '123 Main St',
      district: 'Coimbatore', pincode: '641001', state: 'Tamil Nadu'
    },
    {
      id: '11', no: '01', name: 'Sophia Wilson', rollNum: '5223cs009', className: '12', section: 'A', // Corrected 'class' to 'className'
      profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', // Added profilePic
      accomType: 'Hosteller', transport: 'No', location: 'Singanallur', contact: '82486 69086',
      rank: '001', points: '28980',
      firstName: 'Sophia', lastName: 'Wilson', gender: 'Female', dateOfBirth: '15/05/2007',
      fatherName: 'John Wilson', motherName: 'Jane Wilson', fatherContact: '9876543210',
      motherContact: '9876543211', fatherOccupation: 'Engineer', annualIncome: 500000,
      phone: '8248669086', email: 'sophia.w@example.com', address: '123 Main St',
      district: 'Coimbatore', pincode: '641001', state: 'Tamil Nadu'
    },
    {
      id: '12', no: '01', name: 'Sophia Wilson', rollNum: '5223cs009', className: '12', section: 'A', // Corrected 'class' to 'className'
      profilePic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', // Added profilePic
      accomType: 'Hosteller', transport: 'No', location: 'Singanallur', contact: '82486 69086',
      rank: '001', points: '28980',
      firstName: 'Sophia', lastName: 'Wilson', gender: 'Female', dateOfBirth: '15/05/2007',
      fatherName: 'John Wilson', motherName: 'Jane Wilson', fatherContact: '9876543210',
      motherContact: '9876543211', fatherOccupation: 'Engineer', annualIncome: 500000,
      phone: '8248669086', email: 'sophia.w@example.com', address: '123 Main St',
      district: 'Coimbatore', pincode: '641001', state: 'Tamil Nadu'
    },
    // ... ensure you apply these corrections to any other mock data you have
  ];

  getStudents(): Observable<Student[]> {
    return of(this.students);
  }

  addStudent(student: Student): Observable<Student> {
    student.id = (this.students.length + 1).toString(); // Simple ID generation
    this.students.push(student);
    return of(student);
  }

  updateStudent(student: Student): Observable<Student> {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index > -1) {
      this.students[index] = student;
    }
    return of(student);
  }

  deleteStudent(id: string): Observable<boolean> {
    const initialLength = this.students.length;
    this.students = this.students.filter(s => s.id !== id);
    return of(this.students.length < initialLength);
  }
}
