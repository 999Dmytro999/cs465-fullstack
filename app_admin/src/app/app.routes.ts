import { Routes } from '@angular/router';
import { AddTripComponent } from './components/add-trip/add-trip';
import { EditTripComponent } from './components/edit-trip/edit-trip';
import { TripListComponent } from './components/trip-list/trip-list';
import { LoginComponent } from './components/login/login';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
  { path: 'trips', component: TripListComponent, title: 'Trips | Travlr Admin' },
  { path: 'login', component: LoginComponent, title: 'Login | Travlr Admin' },
  { path: 'add-trip', component: AddTripComponent, canActivate: [authGuard], title: 'Add Trip | Travlr Admin' },
  { path: 'edit-trip/:tripCode', component: EditTripComponent, canActivate: [authGuard], title: 'Edit Trip | Travlr Admin' },
  { path: '', pathMatch: 'full', redirectTo: 'trips' },
  { path: '**', redirectTo: 'trips' }
];
