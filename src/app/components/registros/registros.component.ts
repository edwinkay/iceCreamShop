import { Component, OnInit } from '@angular/core';
import { RegistrosService } from 'src/app/services/registros.service';
import * as _ from 'lodash';

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
  countOccurrences(arr: string[]): string[] {
    const result = [];
    const count: Record<string, number> = {};
    for (const item of arr) {
      if (item in count) {
        count[item] += 1;
      } else {
        count[item] = 1;
      }
    }
    for (const [item, occ] of Object.entries(count)) {
      result.push(`${item}${occ > 1 ? ' x' + occ : ''}`);
    }
    return result;
  }
}
