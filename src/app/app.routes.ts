import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
export const routes: Routes = [
  // Default routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // public routes
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent },
  // wild card route
  { path: '**', redirectTo: '/login' },
];
