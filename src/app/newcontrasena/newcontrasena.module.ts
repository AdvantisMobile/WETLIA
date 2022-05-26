import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewcontrasenaPageRoutingModule } from './newcontrasena-routing.module';

import { NewcontrasenaPage } from './newcontrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewcontrasenaPageRoutingModule
  ],
  declarations: [NewcontrasenaPage]
})
export class NewcontrasenaPageModule {}
