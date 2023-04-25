import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrosService {
  constructor(private firestore: AngularFirestore) {}

  guardarRegistros(registro: any): Promise<any> {
    return this.firestore.collection('registros').add(registro);
  }
}
