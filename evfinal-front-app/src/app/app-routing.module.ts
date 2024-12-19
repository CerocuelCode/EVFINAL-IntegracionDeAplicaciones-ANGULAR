import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPlatillosComponent } from './platillos/lista-platillos/lista-platillos.component';
import { CrearPlatilloComponent } from './platillos/crear-platillo/crear-platillo.component';
import { ActualizarPlatilloComponent} from "./platillos/actualizar-platillo/actualizar-platillo.component";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para el login (sin guardia)
  { path: 'platillos', component: ListaPlatillosComponent, canActivate: [AuthGuard] },
  { path: 'crear-platillo', component: CrearPlatilloComponent, canActivate: [AuthGuard] },
  { path: 'actualizar-platillo/:id', component: ActualizarPlatilloComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
