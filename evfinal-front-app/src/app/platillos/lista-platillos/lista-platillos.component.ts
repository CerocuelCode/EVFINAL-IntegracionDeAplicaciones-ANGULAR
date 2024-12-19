import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlatilloService } from '../../services/platillo.service';
import { Platillo } from '../../models/platillo.model';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-lista-platillos',
  templateUrl: './lista-platillos.component.html',
  styleUrls: ['./lista-platillos.component.css']
})
export class ListaPlatillosComponent implements OnInit, OnDestroy {
  platillos: Platillo[] = [];
  private destroy$ = new Subject<void>();
  cargando = true;
  mensajeError: string | null = null;

  constructor(private platilloService: PlatilloService, private router: Router) { }


  ngOnInit(): void {
    this.obtenerPlatillos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  obtenerPlatillos() {
    this.cargando = true;
    this.mensajeError = null;
    this.platilloService.obtenerPlatillos().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => { // 'response' en lugar de 'data' para mayor claridad
        this.platillos = response.platillos; // Accede a response.platillos
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error obteniendo platillos:', error);
        this.cargando = false;
        this.mensajeError = 'Error al cargar los platillos. Por favor, inténtelo de nuevo más tarde.';
      }
    });
  }

  editarPlatillo(id: number) {
    this.router.navigate(['/platillos/actualizar', id]); // Ruta corregida
  }


  eliminarPlatillo(_id: string) {
    this.mensajeError = null; // Limpiar mensaje de error anterior
    this.platilloService.eliminarPlatillo(_id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        console.log('Platillo eliminado');
        this.obtenerPlatillos(); // Recargar la lista
      },
      error: (error) => {
        console.error('Error eliminando platillo:', error);
        if(error.error && error.error.mensaje){
          this.mensajeError = error.error.mensaje;
        } else{
          this.mensajeError = "Error al eliminar el platillo"
        }
      }
    });
  }
}
