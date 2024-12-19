import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Platillo } from '../models/platillo.model';
import {catchError} from "rxjs/operators";

interface RespuestaPlatillos {
  mensaje: string;
  platillos: Platillo[];
}

@Injectable({
  providedIn: 'root'
})
export class PlatilloService {
  private apiUrl = 'http://localhost:3000/api'; // URL base

  constructor(private http: HttpClient) { }

  obtenerPlatillos(): Observable<RespuestaPlatillos> {
    return this.http.get<RespuestaPlatillos>(`${this.apiUrl}/obtener_platillos`); // Coincide con el backend
  }

  obtenerPlatilloPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/obtener_platillo/${id}`); // Coincide con el backend
  }

  crearPlatillo(platillo: Platillo): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear_platillo`, platillo); // Coincide con el backend
  }

  actualizarPlatillo(platillo: Platillo): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar_platillo`, platillo); // Coincide con el backend
  }

  eliminarPlatillo(id: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/eliminar_platillo/${id}`, { responseType: 'text' }).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
