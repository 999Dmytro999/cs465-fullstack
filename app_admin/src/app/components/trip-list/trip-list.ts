import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Trip } from '../../models/trip';
import { TripDataService } from '../../services/trip-data';
import { TripCardComponent } from '../trip-card/trip-card';

@Component({
  selector: 'app-trip-list',
  imports: [RouterLink, TripCardComponent],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.css'
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  loading = true;
  errorMessage = '';

  constructor(private readonly tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.loading = true;
    this.errorMessage = '';
    this.tripDataService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
        this.loading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }

  deleteTrip(code: string): void {
    if (!window.confirm(`Delete trip ${code}?`)) {
      return;
    }

    this.tripDataService.deleteTrip(code).subscribe({
      next: () => this.loadTrips(),
      error: (error: Error) => (this.errorMessage = error.message)
    });
  }
}
