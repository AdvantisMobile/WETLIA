import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewcontrasenaPage } from './newcontrasena.page';

const routes: Routes = [
  {
    path: '',
    component: NewcontrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewcontrasenaPageRoutingModule {}
