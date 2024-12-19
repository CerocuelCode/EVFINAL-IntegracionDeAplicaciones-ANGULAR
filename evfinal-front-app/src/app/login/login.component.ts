import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from "@angular/router"; // Importa el servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage: string = ''; // Para mostrar el mensaje de error

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.errorMessage = ''; // Limpia cualquier mensaje de error anterior
        this.router.navigate(['/platillos']);
      },
      error: (error) => {
        this.errorMessage = error.message; // Muestra el mensaje de error
        console.error("Error del login", error);
      }
    });
  }
}
