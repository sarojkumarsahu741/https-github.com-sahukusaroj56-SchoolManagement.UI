import { Routes } from '@angular/router';
import { authGuard } from '../auth/auth.guard';
import { SectionsComponent } from '../components/masters/sections/sections.component';

export const routes: Routes = [
    { path: '', component: SectionsComponent },
];
