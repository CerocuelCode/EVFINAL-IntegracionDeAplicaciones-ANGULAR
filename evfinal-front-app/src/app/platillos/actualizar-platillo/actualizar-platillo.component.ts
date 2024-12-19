import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatilloService } from '../../services/platillo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Platillo } from '../../models/platillo.model';

@Component({
  selector: 'app-actualizar-platillo',
  templateUrl: './actualizar-platillo.component.html',
  styleUrls: ['./actualizar-platillo.component.css']
})
export class ActualizarPlatilloComponent implements OnInit {

  cargando = false;
  id: string = '';
  mensajeExito: string | null = null;
  mensajeError: string | null = null;
  platilloForm!: FormGroup;
  platillo: Platillo | null = null;

  constructor(
    private route: ActivatedRoute,
    private platilloService: PlatilloService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.inicializarFormulario();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.cargarPlatillo();
    });
  }

  cargarPlatillo() {
    if (this.id) {
      this.platilloService.obtenerPlatilloPorId(this.id).subscribe({
        next: (response) => {
          if (response && response.platillo) {
            const platillo = response.platillo;
            const platilloFormateado = {
              id: this.id, // <--- Incluir el ID en el objeto formateado (CRUCIAL)
              nombre: platillo.nombre,
              ingredientes: platillo.ingredientes,
              precio: Number(platillo.precio),
              imagen: platillo.imagen
            };

            console.log("Datos formateados:", platilloFormateado);
            this.platilloForm.patchValue(platilloFormateado);
            console.log("Formulario DESPUÉS de patchValue:", this.platilloForm.value);
          } else {
            console.error("Platillo no encontrado o respuesta incorrecta:", response);
            this.mensajeError = "El platillo no se encontró.";
            this.cargando = false;
          }
        },
        error: (error) => {
          console.error("Error al cargar platillo:", error);
          this.mensajeError = this.obtenerMensajeError(error);
          this.cargando = false;
        }
      });
    } else {
      console.error("ID del platillo no definido en cargarPlatillo.");
      this.mensajeError = "ID del platillo no definido.";
      this.cargando = false;
    }
  }

  inicializarFormulario() {
    this.platilloForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      imagen: ['', Validators.required]
    });
    console.log("Formulario inicializado:", this.platilloForm);
  }

  onSubmit() {
    if (this.platilloForm.valid) { // Simplificar la condición
      this.cargando = true; // Activar el indicador de carga

      const platilloActualizado = this.platilloForm.value;

      // Verificar si this.id existe y agregarlo al objeto platilloActualizado
      if (this.id) {
        platilloActualizado.id = this.id;
      } else {
        console.error("ID del platillo no definido.");
        this.mensajeError = "Error interno: ID del platillo no encontrado.";
        this.cargando = false;
        return; // Detener la ejecución si no hay ID
      }

      console.log("Datos a enviar:", platilloActualizado); // Imprime el objeto completo, incluyendo el ID

      this.platilloService.actualizarPlatillo(platilloActualizado).subscribe({
        next: (response) => {
          console.log('Platillo actualizado:', response);
          this.mensajeExito = 'Platillo actualizado exitosamente.';
          this.mensajeError = null; // Limpiar cualquier mensaje de error anterior
          this.cargando = false; // Desactivar el indicador de carga
          // Redirigir después de un breve retraso para que el mensaje de éxito sea visible
          setTimeout(() => {
            this.router.navigate(['/platillos']); // Redirige a la lista
          }, 1000); // Espera 1 segundo
        },
        error: (error) => {
          console.error("Error al actualizar platillo:", error);
          this.mensajeError = this.obtenerMensajeError(error); // Usa la función para obtener un mensaje legible
          this.mensajeExito = null; // Limpiar mensaje de exito
          this.cargando = false; // Desactivar el indicador de carga
        }
      });
    } else {
      this.mensajeError = "Por favor, complete todos los campos del formulario.";
    }
  }

  obtenerMensajeError(error: any): string {
    if (error.error && error.error.mensaje) {
      return error.error.mensaje;
    } else if (typeof error.error === 'string') {
      return error.error;
    } else if (typeof error === 'string') {
      return error;
    }
    return "Error al realizar la acción.";
  }
}
