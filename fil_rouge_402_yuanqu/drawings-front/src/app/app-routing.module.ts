import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawingsComponent } from './Components/drawings/drawings.component';
import { HomeComponent } from './Components/home/home.component';
import { PictureComponent } from './Components/picture/picture.component';
import { ShapesComponent } from './Components/shapes/shapes.component';

const routes: Routes = [];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },

    {
      path: 'drawings',
      component: DrawingsComponent
    },
    {
      path: 'drawings/picture',
      component: PictureComponent
    },
    {
      path: 'shapes',
      component: ShapesComponent
    }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
