import {Component, Input, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ShapesTableComponent } from '../shapes-table/shapes-table.component';
import { ShapesComponent } from '../shapes/shapes.component';
import { DrawingsService } from 'src/app/Services/drawings.service';
import { fabric } from 'fabric';
import { BehaviorSubject, queueScheduler } from 'rxjs';
import { ListShape } from 'src/app/Models/listShape';
import { Shapes } from 'src/app/Models/shapes';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit, AfterViewInit{
  @Input() public drawing: any;
  @Input() public drawingId!: number;
  @Input() public listShape: any[] = new Array;
  @Input() public totalPerimeter: any;
  @Input() public totalArea: any;
  @Input() public totalVolume: any;
  // public canvas?: fabric.Canvas;
  private canvas: any;
  

  constructor(private drawingsService: DrawingsService,
              private modalService: NgbModal,
              public activeModal: NgbActiveModal
  ){ }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
     
    this.toDraw();
  }

  toDraw(){   
    this.canvas = new fabric.Canvas('myCanvas');  // find canvas by id   
      for(const shape of this.listShape){
        this.addCanvas(shape); // to draw one shape
      }      
  }

  addCanvas(shape: any){  // to draw a shape according to it type
    switch(shape.type){
      case 'cylinder': 
        const circle = new fabric.Circle({
          radius: shape.base, left: shape.x, top: shape.y, angle: 0,
          fill: '#3f51b5'
        });
        this.canvas.add(circle); 
        break; 
      case 'rectangular prism': 
        const rect = new fabric.Rect({
          width: shape.base, height: shape.height, left: shape.x, top: shape.y, angle: 0,
          fill: '#3f51b5'
        });
        this.canvas.add(rect); 
        break;
      case 'triangular prism': 
        const height=shape.area*2/shape.base;
        const triangle = new fabric.Triangle({       
          width: shape.base, height: height, left: shape.x, top: shape.y, angle: 0,
          fill: '#3f51b5'
        });
        this.canvas.add(triangle); 
        break;
      default:
        break;
    }   
   }

  openShapesTable(){
    const modalRef = this.modalService.open(ShapesTableComponent, { // open the shapes-table component and pass the following data
      centered: true,
      keyboard: true,
      backdrop: true,
    });
    modalRef.componentInstance.drawingId = this.drawingId;
    modalRef.componentInstance.drawing = this.drawing;
    modalRef.result.then(result=>{ 
      
    this.canvas = new fabric.Canvas('myCanvas');   
    this.addCanvas(result); // draw the new shape added to the list
    this.toDraw(); // draw the old list
    })  
  }

  deleteShape(shapeId: number){
    this.drawingsService.deleteOneShapeFromDrawing(this.drawingId, shapeId).subscribe(  // delete one shape from one drawing in BDD
      res => { // delete the shape from the drawing for the front
        let shapesIndex = this.listShape.findIndex(index => index.id == shapeId);
        this.listShape.splice(shapesIndex, 1);
        this.canvas = new fabric.Canvas('myCanvas');      
      for(const shape of res.listShape){
        this.addCanvas(shape); // redraw the list after the shape is deleted (to refresh data for the front without a new request to the bdd)
      }   
      }
    );
  }
}
