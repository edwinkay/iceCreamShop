import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {
  ajustes: any[] = []



  constructor(private _service:ProductService) { }

  ngOnInit(): void {
    this.getAdjust()
  }
  getAdjust(){
    this._service.obtProductos().subscribe(data => {
      this.ajustes =[]

      // console.log(data)
      data.forEach((element:any) => {
        // console.log(element.payload.doc.id)
        // console.log(element.payload.doc.data())

        //desde los enviamos al array de arriba
        this.ajustes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      // console.log(this.ajustes)
    })
  }
}
