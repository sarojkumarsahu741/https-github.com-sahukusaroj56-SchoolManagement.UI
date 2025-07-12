export interface Student {
  id?: string; // Add this line to include the 'id' property
  no: string;
  name: string;
  profilePic: string;
  rollNum: string;
  className: string;
  accomType: string;
  transport: string;
  location: string;
  contact: string;
  rank: string;
  points: string;
  // Additional fields from the form for a complete model
  firstName?: string;
  lastName?: string;
  gender?: 'Male' | 'Female';
  dateOfBirth?: string;
  section?: string;
  userName?: string; // Make sure this property is present
  password?: string; // And this one
  phone?: string;
  email?: string;
  address?: string;
  district?: string;
  pincode?: string;
  state?: string;
  fatherName?: string;
  motherName?: string;
  fatherContact?: string;
  motherContact?: string;
  fatherOccupation?: string;
  annualIncome?: number;
}