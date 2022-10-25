import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdjustComponent } from './components/adjust/adjust.component';
import { ModificarComponent } from './components/modificar/modificar.component';

@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    CreateProductComponent,
    NavbarComponent,
    AdjustComponent,
    ModificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
    timeOut: 4000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
  }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
