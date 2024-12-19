import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/autenticar';
  private isAuthenticatedSubject = new Subject<boolean>();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  login(credentials: any): Observable<LoginResponse | null> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe( // Corregido: Eliminado /autenticar duplicado
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.isAuthenticatedSubject.next(true);
        this.router.navigate(['/platillos']);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en el inicio de sesión:', error);

        let errorMessage = 'Error desconocido';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMessage = `Código de error: ${error.status}\nMensaje: ${error.error.message || error.message}`;
        }

        this.isAuthenticatedSubject.next(false);
        return throwError(() => new Error(errorMessage)); // Re-lanza el error para que el componente lo maneje
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  checkAuthStatus(): void {
    this.isAuthenticatedSubject.next(this.isAuthenticated());
  }
}
