import { Routes } from '@angular/router';
import { authGuard } from '../auth/auth.guard'; // Your authentication guard
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { StudentsComponent } from '../components/masters/students/students.component';
import { SectionsComponent } from '../components/masters/sections/sections.component'; // Your sections component

export const routes: Routes = [
  // Top-level route for your main application layout
  {
    path: '', // This path will load MainLayoutComponent
    component: MainLayoutComponent,
    // Apply authentication guard here to protect all routes within the main layout
    canActivate: [authGuard],
    children: [
      // Default route when the main layout is active (e.g., /students will be the first page)
      { path: '', redirectTo: 'students', pathMatch: 'full' },
      // Specific routes for your feature pages
      { path: 'students', component: StudentsComponent },
      { path: 'sections', component: SectionsComponent },
      // Add other feature routes here, e.g.:
      // { path: 'teachers', component: TeachersComponent },
      // { path: 'dashboard', component: DashboardComponent },
    ]
  },
  // Optional: Add specific routes outside the main layout (e.g., login, signup)
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },

  // Optional: Wildcard route for 404 Not Found pages
  // { path: '**', component: NotFoundComponent },
];
