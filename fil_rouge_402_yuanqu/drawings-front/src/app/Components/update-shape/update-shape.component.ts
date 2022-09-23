import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShapesService } from 'src/app/Services/shapes.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-shape',
  templateUrl: './update-shape.component.html',
  styleUrls: ['./update-shape.component.css']
})
export class UpdateShapeComponent implements OnInit {
  @Input() public shape: any;
  updateShape!: FormGroup;
  body: any[] = [];
  

  constructor(private shapesService: ShapesService,
              private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private location: Location
) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.updateShape = new FormGroup({ 
      base: new FormControl(''), 
      height: new FormControl(''), 
      depth: new FormControl(''), 
      x: new FormControl(''), 
      y: new FormControl(''), 
      side1: new FormControl(''),
      side2: new FormControl('')   
    });
  }

  onSubmit(type: string) { 
    switch(type){
      case 'cylinder':
        this.body = [];
        this.body.push({
          id: this.shape.id,
          shapeTypeEnum: "CIRCLE",
          base : this.updateShape.value.base,
          depth: this.updateShape.value.depth,
          x: this.updateShape.value.x,
          y: this.updateShape.value.y
        })
        break;
      case 'rectangular prism':
        this.body = [];
        this.body.push({
          id: this.shape.id,
          shapeTypeEnum: "RECTANGLE",
          base : this.updateShape.value.base,
          height: this.updateShape.value.height,
          depth: this.updateShape.value.depth,
          x: this.updateShape.value.x,
          y: this.updateShape.value.y
        })
        break;
      case 'triangular prism':
        this.body = [];
        this.body.push({
          id: this.shape.id,
          shapeTypeEnum: "TRIANGLE",
          base : this.updateShape.value.base,
          depth: this.updateShape.value.depth,
          side1: this.updateShape.value.side1,
          side2: this.updateShape.value.side2,
          x: this.updateShape.value.x,
          y: this.updateShape.value.y
        })
        break;
      default: break;
    }

    this.shapesService.updateShape(this.body[0]).subscribe(res=>{ // to update shape in the BDD
      this.shape =  res;  // (to refresh data for the front without a new request to the bdd)
      this.activeModal.close(res);
    })
  }
}
