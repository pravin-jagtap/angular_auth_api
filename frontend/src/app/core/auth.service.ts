import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  AuthResponse,
  LoginRequest,
  MessageResponse,
  SignupRequest,
  User,
  UsernameAvailabilityResponse
} from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/auth';

  readonly currentUser = signal<User | null>(null);
  readonly authChecked = signal(false);

  signup(payload: SignupRequest): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/signup`, payload, {
      withCredentials: true
    });
  }

  checkUsernameAvailability(username: string): Observable<UsernameAvailabilityResponse> {
    return this.http.get<UsernameAvailabilityResponse>(`${this.apiUrl}/username-availability`, {
      params: { username },
      withCredentials: true
    });
  }

  login(payload: LoginRequest): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, payload, {
      withCredentials: true
    }).pipe(
      map((response) => response.user),
      tap((user) => {
        this.currentUser.set(user);
        this.authChecked.set(true);
      })
    );
  }

  logout(): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.currentUser.set(null);
        this.authChecked.set(true);
      })
    );
  }

  restoreSession(force = false): Observable<User | null> {
    if (this.authChecked() && !force) {
      return of(this.currentUser());
    }

    return this.http.get<AuthResponse>(`${this.apiUrl}/me`, {
      withCredentials: true
    }).pipe(
      map((response) => response.user),
      tap((user) => {
        this.currentUser.set(user);
        this.authChecked.set(true);
      }),
      catchError(() => {
        this.currentUser.set(null);
        this.authChecked.set(true);
        return of(null);
      })
    );
  }
}
