import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { RegistrosService } from 'src/app/services/registros.service';
import { Router } from '@angular/router';

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
  nombreProduct: any[] = [];
  all: any[] = [];

  displayModal: boolean = false;
  displayModal2: boolean = false;
  valorRestado: any;
  resultado: number = 0;
  buttonDisabled: boolean;

  registrarProducto: FormGroup;

  // items: Observable<any[]>;

  // constructor(firestore: AngularFirestore) {
  //   this.items = firestore.collection('items').valueChanges();
  //  }
  constructor(
    private fb: FormBuilder,
    private _services: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private _registroService: RegistrosService
  ) {
    this.registrarProducto = this.fb.group({
      producto: [''],
      total: [''],
    });
  }

  ngOnInit(): void {
    //paso para imprimir
    this.getProducts();
  }
  //metodo añadido desde el servicio
  getProducts() {
    this._services.getProducts().subscribe((data) => {
      if (data.length === 0) {
        this.buttonDisabled = true;
        this.total = 0;
      } else {
        this.buttonDisabled = false;
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
        const nombre = this.productos.map((nombre) => nombre.product);
        this.nombreProduct = nombre;
        console.log(this.nombreProduct);
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
  borrarTodo() {
    this._services.deleteAllProducts();
    this.displayModal2 = false;
    this.total = 0;
    this.valorRestado = null;
    this.resultado = 0;
    this.toastr.error('Todos los productos fueron eliminados', 'Eliminados');
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
    } else {
      this.resultado = 0;
    }
  }
  registrar() {
    const registrar: any = {
      producto: this.nombreProduct,
      total: this.total,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };
    this._registroService.guardarRegistros(registrar).then(() => {
      this._services.deleteAllProducts();
      this.displayModal = false;
      this.total = 0;
      this.valorRestado = null;
      this.resultado = 0;
      this.toastr.success('Registrado con exito', 'Producto Registrado!!');
    });

  }
}
