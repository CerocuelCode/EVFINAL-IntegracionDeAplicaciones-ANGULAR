import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {AppRoutingModule} from "./app-routing.module";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListaPlatillosComponent } from './platillos/lista-platillos/lista-platillos.component';
import { AuthService } from './services/auth.service';
import { CrearPlatilloComponent } from './platillos/crear-platillo/crear-platillo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActualizarPlatilloComponent } from './platillos/actualizar-platillo/actualizar-platillo.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListaPlatillosComponent,
    CrearPlatilloComponent,
    ActualizarPlatilloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
