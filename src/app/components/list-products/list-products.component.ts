import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  //creando un array
  productos: any[] = []
  sumas: any[] = []
  total: any[] = []





  // items: Observable<any[]>;

  // constructor(firestore: AngularFirestore) {
  //   this.items = firestore.collection('items').valueChanges();
  //  }
  constructor(private _services: ProductService,
              private toastr: ToastrService){

  }


  ngOnInit(): void {
    //paso para imprimir
    this.getProducts()
  }
  //metodo añadido desde el servicio
  getProducts(){
    this._services.getProducts().subscribe(data => {
      this.productos =[]
      // console.log(data)
      data.forEach((element:any) => {
        // console.log(element.payload.doc.id)
        // console.log(element.payload.doc.data())
        // const sumar = element.payload.doc.data()['price']

        // console.log(sumar)

        // this.sumas.push(
        //   sumar
        // )

        //     const newSuma = this.sumas.reduce((sum, item) => sum + item, 0)




        // this.total.push(
        //   newSuma
        //   )
        //   console.log(this.sumas)

        //desde los enviamos al array de arriba
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        })
      });
      // console.log(this.productos)

      
    })
  }
  //dando funcion al boton delete
  eliminarProducto(id: string){
    this._services.deleteProducts(id).then(() => {
      this.toastr.error('El producto fue eliminado con exito', 'Producto eliminado')
      console.log('deleted...')
    }).catch(error => {
      console.log(error)
    })
  }

}
