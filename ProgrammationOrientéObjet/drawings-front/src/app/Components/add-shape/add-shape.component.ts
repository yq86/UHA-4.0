import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShapesService } from 'src/app/Services/shapes.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-shape',
  templateUrl: './add-shape.component.html',
  styleUrls: ['./add-shape.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddShapeComponent implements OnInit {
  @Input() shapes: any;
  addShape!: FormGroup;
  body: any[] = [];


  constructor(
              private shapesService: ShapesService,
              private modalService: NgbModal,
              public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {  // initialize the form to create a new shape
    this.addShape = new FormGroup({ 
      type: new FormControl(''), 
      base: new FormControl(''), 
      height: new FormControl(''), 
      depth: new FormControl(''), 
      side1: new FormControl(''),
      side2: new FormControl(''),
      x: new FormControl(''), 
      y: new FormControl('')  
    });
  }

  onSubmit(type: string){
    switch(type){
      case 'CIRCLE':
        this.body = [];
        this.body.push({
          shapeTypeEnum: "CIRCLE",
          base : this.addShape.value.base,
          depth: this.addShape.value.depth,
          x: this.addShape.value.x,
          y: this.addShape.value.y
        })
        break;
      case 'RECTANGLE':
        this.body = [];
        this.body.push({
          shapeTypeEnum: "RECTANGLE",
          base : this.addShape.value.base,
          height: this.addShape.value.height,
          depth: this.addShape.value.depth,
          x: this.addShape.value.x,
          y: this.addShape.value.y
        })
        break;
      case 'TRIANGLE':
        this.body = [];
        this.body.push({
          shapeTypeEnum: "TRIANGLE",
          base : this.addShape.value.base,
          depth: this.addShape.value.depth,
          side1: this.addShape.value.side1,
          side2: this.addShape.value.side2,
          x: this.addShape.value.x,
          y: this.addShape.value.y
        })
        break;
      default: break;
    }

    this.shapesService.addShape(this.body[0]).subscribe( // to post the new shape into BDD
      res => {
        this.shapes.push(res); // to refresh the list of shapes for the front (to refresh data for the front without a new request to the bdd)
      }
    );
    this.activeModal.close('success');
  }
}
