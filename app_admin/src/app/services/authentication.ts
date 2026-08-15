import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {
  AuthenticatedUser,
  AuthResponse,
  LoginCredentials,
  RegistrationDetails
} from '../models/user';

export const TOKEN_STORAGE_KEY = 'travlr-admin-token';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly apiBaseUrl = 'http://localhost:3000/api';
  private readonly loggedInState = signal(this.hasValidToken());

  constructor(private readonly http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/login`, credentials).pipe(
      tap((response) => this.saveToken(response.token)),
      catchError(this.handleError)
    );
  }

  register(details: RegistrationDetails): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/register`, details).pipe(
      tap((response) => this.saveToken(response.token)),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    this.loggedInState.set(false);
  }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    this.loggedInState.set(this.hasValidToken());
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    const valid = this.hasValidToken();
    if (!valid && this.loggedInState()) {
      this.logout();
    }
    return valid && this.loggedInState();
  }

  getCurrentUser(): AuthenticatedUser | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      return JSON.parse(this.decodeBase64Url(token.split('.')[1])) as AuthenticatedUser;
    } catch {
      return null;
    }
  }

  private hasValidToken(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.exp * 1000 > Date.now();
  }

  private decodeBase64Url(value: string): string {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - (normalized.length % 4)) % 4);
    return decodeURIComponent(
      atob(normalized + padding)
        .split('')
        .map((character) => `%${character.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join('')
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const apiMessage = error.error?.message;
    return throwError(() => new Error(apiMessage || 'Authentication failed.'));
  }
}
