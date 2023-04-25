import { Component, OnInit } from '@angular/core';
import { RegistrosService } from 'src/app/services/registros.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss'],
})
export class RegistrosComponent implements OnInit {
  registros: any[] = [];
  total: number = 0;
  nd: any[] = [];

  constructor(private _registroService: RegistrosService) {}

  ngOnInit(): void {
    this.getRegistros();
        console.log(this.contar(this.registros))
  }
  getRegistros() {
    this._registroService.obtenerRegistros().subscribe((data) => {
      this.registros = data.map((element: any) => ({
        id: element.payload.doc.id,
        producto: element.payload.doc.data().producto,
        total: element.payload.doc.data().total,
        fechaCreacion: element.payload.doc.data().fechaCreacion.toDate(),
      }));
      console.log(this.registros);
      const total = this.registros.reduce(
        (acumulador, producto) => acumulador + producto.total,
        0
      );
      this.total = total;

      const prod = this.registros.map((element) => element.producto);

      for (const item of this.registros) {
        const fecha = item.fechaCreacion;
        const opcionesFecha = {
          weekday: 'long', // Día de la semana, por ejemplo "lunes"
          year: 'numeric', // Año con cuatro dígitos, por ejemplo "2023"
          month: 'long', // Mes, por ejemplo "abril"
          day: 'numeric', // Día del mes, por ejemplo "25"
        };

        const opcionesHora = {
          hour: 'numeric', // Hora en formato de 12 horas, por ejemplo "12"
          minute: 'numeric', // Minutos, por ejemplo "34"
          hour12: true, // Indica si la hora debe estar en formato de 12 horas (AM/PM) o de 24 horas
        };
        const fechaFormateada =
          fecha.toLocaleDateString('es-CO', opcionesFecha) +
          ' ' +
          fecha.toLocaleTimeString('es-CO', opcionesHora);

        item.fechaCreacion = fechaFormateada;
      }
    });
  }
  joinArray(arr: string[], separator: string): string {
    return arr.join(separator);
  }
  contar(arr: any[]){
    const mapa = new Map();
      arr.forEach((elemento) => {
        if (mapa.has(elemento)) {
          mapa.set(elemento, mapa.get(elemento) + 1);
        } else {
          mapa.set(elemento, 1);
        }
      });
      return mapa;
  }
}
