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
  total: number = 0;
  all: any[] = [];

  displayModal: boolean = false;
  displayModal2: boolean = false;
  valorRestado: any;
  resultado: number = 0;
  buttonDisabled: boolean;

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
      if (data.length === 0) {
        this.buttonDisabled = true
        this.total = 0;
      }else {
        this.buttonDisabled = false
      }
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
        this.valorRestado = null;
        this.resultado = 0;
        console.log('deleted...');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  borrarTodo(){
    this._services.deleteAllProducts()
    this.displayModal2 = false;
    this.total = 0;
    this.valorRestado = null;
    this.resultado = 0
  }

  showDialog() {
    this.displayModal = true;
  }
  showDialog2() {
    this.displayModal2 = true;
  }

  onDialogHide() {
    this.displayModal = false;
    this.displayModal2 = false;
  }
  restarValor() {
    if (this.valorRestado >= this.total) {
      this.resultado = Math.abs(this.total - this.valorRestado);
    }else{
      this.resultado = 0
    }
  }

}
