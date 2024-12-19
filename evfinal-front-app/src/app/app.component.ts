import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Usa templateUrl
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'evfinal-front-app';

  constructor(public authService: AuthService) { } // Inyecta el servicio

  logout() {
    this.authService.logout();
  }
}
