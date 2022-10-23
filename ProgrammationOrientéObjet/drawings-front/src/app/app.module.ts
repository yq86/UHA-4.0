import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawingsComponent } from './Components/drawings/drawings.component';
import { ShapesComponent } from './Components/shapes/shapes.component';
import { HomeComponent } from './Components/home/home.component';
import { PictureComponent } from './Components/picture/picture.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { UpdateShapeComponent } from './Components/update-shape/update-shape.component';
import { AddShapeComponent } from './Components/add-shape/add-shape.component';
import { ShapesTableComponent } from './Components/shapes-table/shapes-table.component';
import { AddPictureComponent } from './Components/add-picture/add-picture.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    DrawingsComponent,
    ShapesComponent,
    HomeComponent,
    PictureComponent,
    FooterComponent,
    HeaderComponent,
    UpdateShapeComponent,
    AddShapeComponent,
    ShapesTableComponent,
    AddPictureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ScrollingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
