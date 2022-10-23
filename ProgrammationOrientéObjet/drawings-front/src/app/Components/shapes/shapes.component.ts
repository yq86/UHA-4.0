import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShapesService } from 'src/app/Services/shapes.service';
import { Shapes } from 'src/app/Models/shapes';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateShapeComponent } from '../update-shape/update-shape.component';
import { ThisReceiver } from '@angular/compiler';
import { AddShapeComponent } from '../add-shape/add-shape.component';
import { fabric } from 'fabric';
import { BehaviorSubject, switchMap } from 'rxjs';


@Component({
  selector: 'app-shapes',
  templateUrl: './shapes.component.html',
  styleUrls: ['./shapes.component.css']
})
export class ShapesComponent implements OnInit {
  
  public shapes: any[] = new Array;
  public shape: any;
  private canvas: any;

  constructor(private shapesService: ShapesService,
              private modalService: NgbModal
    ) { }
  
  ngOnInit(): void {  
    this.getShapes();
  }

  public getShapes(): void {
    this.shapesService.getAllShapes().subscribe(  // get all the shapes from the bdd
      (response) => {
        this.shapes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } 

  updateShape(id: number): void{
    this.shape = this.shapes.find((s: { id: number; }) => s.id === id); // find the right shape to update
        const modalRef = this.modalService.open(UpdateShapeComponent, {
          centered: true,
          keyboard: true,
          backdrop: true,
        });
        modalRef.result.then(result => {
          this.shape = result;
          let shapesIndex = this.shapes.findIndex(index => index.id == this.shape.id); // find the right shape in the front 
          this.shapes[shapesIndex] = this.shape; // to replace the old shape in the list with the updated one(to refresh data for the front without a new request to the bdd)
      })     
        modalRef.componentInstance.shape =  this.shape;   
  }

  addShape(){
    const modalRef = this.modalService.open(AddShapeComponent, {
      centered: true,
      keyboard: true,
      backdrop: true,
    });
    modalRef.componentInstance.shapes = this.shapes;
  }
}   
   
    