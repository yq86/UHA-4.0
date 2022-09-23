import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Drawings } from 'src/app/Models/drawings';
import { DrawingsService } from 'src/app/Services/drawings.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PictureComponent } from '../picture/picture.component';
import { AddPictureComponent } from '../add-picture/add-picture.component';
import { AddShapeComponent } from '../add-shape/add-shape.component';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { ShapesService } from 'src/app/Services/shapes.service';

@Component({
  selector: 'app-drawings',
  templateUrl: './drawings.component.html',
  styleUrls: ['./drawings.component.css']
})
export class DrawingsComponent implements OnInit {
  public drawings: Drawings[] = [];
  public shapes: any;
  public drawing: any = [];
 
  constructor(private drawingsService: DrawingsService,
              private modalService: NgbModal,
              private shapesService: ShapesService
    ) { }

  ngOnInit(){
   this.getDrawings();
   this.getShapes();
  }
 
  public getDrawings(){
    this.drawingsService.getAllDrawings().subscribe(  // get all the drawings from the BDD
      (response: Drawings[]) => {
        this.drawings = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  } 

  public getShapes(): void {
    this.shapesService.getAllShapes().subscribe( // to get all the shapes from BDD
      (response) => {
        this.shapes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } 
 
  public pictureChoice(drawingId: number){ 
    this.drawing = this.drawings.find(d => d.id === drawingId); // to find the right drawing
      const modalRef = this.modalService.open(PictureComponent, { // to open the picture component and send the following data 
        
      }); 
      modalRef.componentInstance.drawing = this.drawing;
      modalRef.componentInstance.listShape = this.drawing.listShape;
      modalRef.componentInstance.totalPerimeter = this.drawing.totalPerimeter;
      modalRef.componentInstance.totalArea = this.drawing.totalArea;
      modalRef.componentInstance.totalVolume = this.drawing.totalVolume;
      modalRef.componentInstance.drawingId = drawingId;  
  }

  addPicture(){
    const modalRef = this.modalService.open(AddPictureComponent,{ // to open the add-picture component
      centered: true,
      keyboard: true,
      backdrop: true,
    });
    modalRef.componentInstance.drawings = this.drawings; // pass the drawing list to the add-picture component
  }

  deleteDrawing(drawingId: number){ 
    this.drawingsService.deleteDrawing(drawingId).subscribe( // to delete the drawing from the BDD
      res => {
        let shapesIndex = this.drawings.findIndex(index => index.id == drawingId); // find the index of the drawing to be deleted in the drawing list in the front
        this.drawings.splice(shapesIndex, 1); // delete the drawing from the list for the front (to refresh data for the front without a new request to the bdd)
      }
    );
  }

  createShape(){
    const modalRef = this.modalService.open(AddShapeComponent, {  // open the add-shape component and send the list shapes
      centered: true,
      keyboard: true,
      backdrop: true,
    });
    modalRef.componentInstance.shapes = this.shapes;
  }
}
