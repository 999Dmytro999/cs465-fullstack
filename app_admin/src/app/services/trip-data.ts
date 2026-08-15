import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  private readonly apiBaseUrl = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/trips`).pipe(catchError(this.handleError));
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http
      .get<Trip>(`${this.apiBaseUrl}/trips/${encodeURIComponent(tripCode)}`)
      .pipe(catchError(this.handleError));
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http
      .post<Trip>(`${this.apiBaseUrl}/trips`, trip)
      .pipe(catchError(this.handleError));
  }

  updateTrip(originalCode: string, trip: Trip): Observable<Trip> {
    return this.http
      .put<Trip>(`${this.apiBaseUrl}/trips/${encodeURIComponent(originalCode)}`, trip)
      .pipe(catchError(this.handleError));
  }

  deleteTrip(tripCode: string): Observable<{ message: string; trip: Trip }> {
    return this.http
      .delete<{ message: string; trip: Trip }>(
        `${this.apiBaseUrl}/trips/${encodeURIComponent(tripCode)}`
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const apiMessage = error.error?.message;
    return throwError(() => new Error(apiMessage || 'The Travlr API request failed.'));
  }
}
