import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatilloService } from '../../services/platillo.service';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-crear-platillo',
  templateUrl: './crear-platillo.component.html',
  styleUrls: ['./crear-platillo.component.css']
})
export class CrearPlatilloComponent implements OnInit {
  platilloForm: FormGroup;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(private fb: FormBuilder, private platilloService: PlatilloService, private router: Router) {
    this.platilloForm = this.fb.group({
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]], // Valida que sea un número
      imagen: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.platilloForm.valid) {
      this.mensajeError = null;
      this.mensajeExito = null;

      this.platilloService.crearPlatillo(this.platilloForm.value).subscribe({
        next: (response) => {
          console.log('Platillo creado:', response);
          this.mensajeExito = 'Platillo creado exitosamente.';
          this.platilloForm.reset(); // Limpia el formulario
          this.router.navigate(['/platillos']) // Redirige a la lista
        },
        error: (error) => {
          console.error('Error al crear platillo:', error);
          if(error.error && error.error.mensaje){
            this.mensajeError = error.error.mensaje;
          } else{
            this.mensajeError = "Error al crear el platillo"
          }
        }
      });
    }
  }
}
