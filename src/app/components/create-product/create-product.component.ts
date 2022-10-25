import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AsyncSubject } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  createProduct: FormGroup
  subbmited = false
  loading = false
  id: string | null
  titleChange: string = 'Agregar Producto'

  //////////////////////////////////////////////



  mesa: string[] = [ 'Mesa #1','Mesa #2','Mesa #3','Mesa #4', 'Mesa #5']
  productos: string[] = ['',
    'Ensalada pequeña',' Ensalada Grande', 'Estrella', 'Banana Split', 'Fresa Split', 'Copa cereza', 'Copa Oreo', 'Copa queso', 'Copa Arequipe', 'Banano Queso', 'Copa kiwi', 'helado chocorramo', 'Helado corazon', 'Malteada', 'Milo', 'Sunday', 'Michelada de soda', 'Fresas con chocolate', 'Maracumango', 'Brownie con helado', 'Cholado', 'Combo Tentacion','Paleta de agua','Paleta mango biche', 'cono', 'helado casero','chococono'
  ]

 prices:number[] = [700,1000,1500,2000,2500,4000,5000,6000,7000,8000,9000,10000]


////////////////////////////////////////////////////////


  constructor(private fb: FormBuilder,
              private _Servicio: ProductService,
              private router: Router,
              private toastr: ToastrService,
              private aRouter: ActivatedRoute,) {
    this.createProduct = this.fb.group({
      table:['', Validators.required],
      product:['', Validators.required],
      flavor:['', ],
      flavor2:['', ],
      flavor3:['', ],
      price:['', Validators.required],
      note:['', Validators.maxLength(30)],
    })
    //atrapando el producto por su id
    this.id = this.aRouter.snapshot.paramMap.get('id')
    // console.log(this.id)
   }

  ngOnInit(): void {
    this.EXeditProducto()
    this.obtener()
  }

  //aqui se envia la informacion a la data base
    agregarEditarProducto(){
      //se valida todos los campos
      this.subbmited = true

      if (this.createProduct.invalid) {
        return
      }
      if (this.id === null) {
        this.agregarProducto()
      }else{
        this.editarProducto(this.id)
      }

    }
    agregarProducto(){
      //se captura desde el html
      const producto : any = {
        table: this.createProduct.value.table,
        product: this.createProduct.value.product,
        flavor: this.createProduct.value.flavor,
        flavor2: this.createProduct.value.flavor2,
        flavor3: this.createProduct.value.flavor3,
        price: this.createProduct.value.price,
        note: this.createProduct.value.note,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      }
      //creando la promesa para firebase
        // console.log(producto)
        this.loading = true
        this._Servicio.agregarproducto(producto).then(() => {
          // console.log('registrado con exito.....')
          this.toastr.success('Agregado con exito!!','Producto Agregado')
          this.loading = false
          this.router.navigate(['/'])
        }).catch(error => {
          console.log(error)
        })
    }
    //enviando los datos al servidor
    editarProducto(id: string){
      this.loading = true

      const producto : any = {
        table: this.createProduct.value.table,
        product: this.createProduct.value.product,
        flavor: this.createProduct.value.flavor,
        flavor2: this.createProduct.value.flavor2,
        flavor3: this.createProduct.value.flavor3,
        price: this.createProduct.value.price,
        note: this.createProduct.value.note,
        fechaActualizacion: new Date()
      }

      this._Servicio.update(id, producto).then(() => {
        this.loading = false
        this.toastr.info('Producto modificado con exito', 'Actualizacio Exitosa')
      })
      this.router.navigate(['/'])
    }
    //cargando los datos al html editar
    EXeditProducto(){
      if (this.id !== null) {
        this.titleChange = 'Editar Producto'
        this.loading = true
        this._Servicio.getProducto(this.id).subscribe(data => {
          this.loading = false
          // console.log(data)
          // console.log(data.payload.data()['nombre'])

          //enviando datos a editar
          this.createProduct.setValue({
            table: data.payload.data()['table'],
            product: data.payload.data()['product'],
            flavor: data.payload.data()['flavor'],
            flavor2: data.payload.data()['flavor2'],
            flavor3: data.payload.data()['flavor3'],
            price: data.payload.data()['price'],
            note: data.payload.data()['note']
          })
        })
      }
    }
    /////////////////////////////////
    flavors: any[] = []

      obtener(){
      this._Servicio.obtProductos().subscribe(data => {
      this.flavors =[]

      // console.log(data)
      data.forEach((element:any) => {
        // console.log(element.payload.doc.id)
        // console.log(element.payload.doc.data())
        // console.log(element.payload.doc.data()['sabor1'])

        //desde los enviamos al array de arriba
        this.flavors.push(
          element.payload.doc.data()['sabor01'],
          element.payload.doc.data()['sabor02'],
          element.payload.doc.data()['sabor03'],
          element.payload.doc.data()['sabor04'],
          element.payload.doc.data()['sabor05'],
          element.payload.doc.data()['sabor06'],
          element.payload.doc.data()['sabor07'],
          element.payload.doc.data()['sabor08'],
          element.payload.doc.data()['sabor09'],
          element.payload.doc.data()['sabor10'],
          element.payload.doc.data()['sabor11'],
          element.payload.doc.data()['sabor12'],
          )
      });
      console.log(this.flavors)
    })

      }
}
