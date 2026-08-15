import { Routes } from '@angular/router';
import { AddTripComponent } from './components/add-trip/add-trip';
import { EditTripComponent } from './components/edit-trip/edit-trip';
import { TripListComponent } from './components/trip-list/trip-list';

export const routes: Routes = [
  { path: 'trips', component: TripListComponent, title: 'Trips | Travlr Admin' },
  { path: 'add-trip', component: AddTripComponent, title: 'Add Trip | Travlr Admin' },
  { path: 'edit-trip/:tripCode', component: EditTripComponent, title: 'Edit Trip | Travlr Admin' },
  { path: '', pathMatch: 'full', redirectTo: 'trips' },
  { path: '**', redirectTo: 'trips' }
];
