import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdjustComponent } from './components/adjust/adjust.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ModificarComponent } from './components/modificar/modificar.component';

const routes: Routes = [
  {path:'', redirectTo: 'list-products', pathMatch: 'full'},
  {path:'list-products', component:ListProductsComponent},
  {path: 'create-product', component:CreateProductComponent},
  {path: 'edit-product/:id', component:CreateProductComponent},
  {path: 'mod', component:ModificarComponent},
  {path: 'crear', component:AdjustComponent},
  {path: 'adjust/:id', component:AdjustComponent},
  {path:'**', redirectTo: 'list-products', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
