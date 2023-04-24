import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  //creando un array
  productos: any[] = [];
  sumas: any[] = [];
  total: number;
  all: any[] = [];

  displayModal: boolean = false;
  valorRestado: any;
  resultado: number = 0;

  // items: Observable<any[]>;

  // constructor(firestore: AngularFirestore) {
  //   this.items = firestore.collection('items').valueChanges();
  //  }
  constructor(
    private _services: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //paso para imprimir
    this.getProducts();
  }
  //metodo añadido desde el servicio
  getProducts() {
    this._services.getProducts().subscribe((data) => {
      this.productos = [];
      data.forEach((element: any) => {
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
        const total = this.productos.reduce(
          (acumulador, producto) => acumulador + producto.price,
          0
        );
        this.total = total;
        console.log(total);
      });
    });
  }
  //dando funcion al boton delete
  eliminarProducto(id: string) {
    this._services
      .deleteProducts(id)
      .then(() => {
        this.toastr.error(
          'El producto fue eliminado con exito',
          'Producto eliminado'
        );
        console.log('deleted...');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showDialog() {
    this.displayModal = true;
  }

  onDialogHide() {
    this.displayModal = false;
  }
  restarValor() {
    if (this.valorRestado >= this.total) {
      this.resultado = Math.abs(this.total - this.valorRestado);
    }else{
      this.resultado = 0
    }

  }
}
