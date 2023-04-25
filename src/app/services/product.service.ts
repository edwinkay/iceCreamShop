import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}

  //envia desde el html a firebase
  agregarproducto(producto: any): Promise<any> {
    return this.firestore.collection('productos').add(producto);
  }

  //consumir datos, obteniendo desde firebase
  //metos orderBy para ordenar
  getProducts(): Observable<any> {
    return this.firestore
      .collection('productos').snapshotChanges();
  }

  //eliminar productos
  deleteProducts(id: string): Promise<any> {
    return this.firestore.collection('productos').doc(id).delete();
  }
  deleteAllProducts(): void {
    const productosRef = this.firestore.collection('productos');
    const productos$: Observable<any[]> = productosRef.snapshotChanges();

    productos$.subscribe((productos) => {
      productos.forEach((producto) => {
        this.firestore
          .collection('productos')
          .doc(producto.payload.doc.id)
          .delete();
      });
    });
  }
  //peticion para cargar los datos en editar productos
  getProducto(id: string): Observable<any> {
    return this.firestore.collection('productos').doc(id).snapshotChanges();
  }
  //peticion de los datos editados (actualizarlos)
  update(id: string, data: any): Promise<any> {
    return this.firestore.collection('productos').doc(id).update(data);
  }

  //creando instancia para los ajustes

  ajustarProducto(ajustes: any): Promise<any> {
    return this.firestore.collection('ajustes').add(ajustes);
  }
  obtenerAjuste(id: string): Observable<any> {
    return this.firestore.collection('ajustes').doc(id).snapshotChanges();
  }
  obtProductos(): Observable<any> {
    return this.firestore.collection('ajustes').snapshotChanges();
  }
  updatex(id: string, data: any): Promise<any> {
    return this.firestore.collection('ajustes').doc(id).update(data);
  }
}
