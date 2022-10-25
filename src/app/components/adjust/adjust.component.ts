import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-adjust',
  templateUrl: './adjust.component.html',
  styleUrls: ['./adjust.component.scss']
})
export class AdjustComponent implements OnInit {

  adjustProduct: FormGroup
  id: string | null

  constructor(private fb: FormBuilder,
              private _servicio: ProductService,
              private aRouter: ActivatedRoute,
              private router: Router) {
    this.adjustProduct = this.fb.group({
      sabor01: ['',],
      sabor02: ['',],
      sabor03: ['',],
      sabor04: ['',],
      sabor05: ['',],
      sabor06: ['',],
      sabor07: ['',],
      sabor08: ['',],
      sabor09: ['',],
      sabor10: ['',],
      sabor11: ['',],
      sabor12: ['',],

    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
   }

  ngOnInit(): void {
    this.ajustesImp()
  }
  //aqui lo enviamos a la database creando nuevo objeto
  ajustar(){
    if (this.id === null) {
      this.ajustarAddProduct()
    } else {
      this.ajustesEdit(this.id)
    }

  }
  ajustarAddProduct(){
      const ajustes : any = {
        sabor01: this.adjustProduct.value.sabor01,
        sabor02: this.adjustProduct.value.sabor02,
        sabor03: this.adjustProduct.value.sabor03,
        sabor04: this.adjustProduct.value.sabor04,
        sabor05: this.adjustProduct.value.sabor05,
        sabor06: this.adjustProduct.value.sabor06,
        sabor07: this.adjustProduct.value.sabor07,
        sabor08: this.adjustProduct.value.sabor08,
        sabor09: this.adjustProduct.value.sabor09,
        sabor10: this.adjustProduct.value.sabor10,
        sabor11: this.adjustProduct.value.sabor11,
        sabor12: this.adjustProduct.value.sabor12,
      }
      console.log(ajustes)
      this._servicio.ajustarProducto(ajustes).then(()=>{
        console.log('registrado con exito')
      })
  }
  ajustesEdit(id: string){
    const ajustes : any = {
        sabor01: this.adjustProduct.value.sabor01,
        sabor02: this.adjustProduct.value.sabor02,
        sabor03: this.adjustProduct.value.sabor03,
        sabor04: this.adjustProduct.value.sabor04,
        sabor05: this.adjustProduct.value.sabor05,
        sabor06: this.adjustProduct.value.sabor06,
        sabor07: this.adjustProduct.value.sabor07,
        sabor08: this.adjustProduct.value.sabor08,
        sabor09: this.adjustProduct.value.sabor09,
        sabor10: this.adjustProduct.value.sabor10,
        sabor11: this.adjustProduct.value.sabor11,
        sabor12: this.adjustProduct.value.sabor12,
      }
      this._servicio.updatex(id, ajustes).then(() => {

      })
      this.router.navigate(['/mod'])
  }
  ajustesImp(){
    if (this.id !== null) {
      this._servicio.obtenerAjuste(this.id).subscribe(data => {
        this.adjustProduct.setValue({
          sabor01: data.payload.data()['sabor01'],
          sabor02: data.payload.data()['sabor02'],
          sabor03: data.payload.data()['sabor03'],
          sabor04: data.payload.data()['sabor04'],
          sabor05: data.payload.data()['sabor05'],
          sabor06: data.payload.data()['sabor06'],
          sabor07: data.payload.data()['sabor07'],
          sabor08: data.payload.data()['sabor08'],
          sabor09: data.payload.data()['sabor09'],
          sabor10: data.payload.data()['sabor10'],
          sabor11: data.payload.data()['sabor11'],
          sabor12: data.payload.data()['sabor12'],
        })
      })
    }
  }

}
