import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShapesService } from 'src/app/Services/shapes.service';
import { DrawingsService } from 'src/app/Services/drawings.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddPictureComponent implements OnInit {
  addPicture!: FormGroup;
  public shapes: any[]=[];
  @Input() drawings: any;

  constructor(private drawingsService: DrawingsService,
              private shapesService: ShapesService,
              public activeModal: NgbActiveModal,
              private router: Router, 
              private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
  this.getShapes();
  }

  public getShapes(): void {
    this.shapesService.getAllShapes().subscribe(  // get all the shapes from BDD
      (response) => {
        this.shapes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  initForm() { // initialize the form to create a drawing
    this.addPicture = new FormGroup({ 
      pictureName: new FormControl(''), 
      shape: new FormControl('') 
    });
  }

  onSubmit(){
    const pictureName = this.addPicture.value.pictureName;
    const shapeId = this.addPicture.value.shape.id;
   
    
    this.drawingsService.addDrawing(pictureName, shapeId).subscribe( // to post the new drawing into BDD
      res => {
        this.drawings.push(res);  // refresh the list of drawings for the front (to refresh data for the front without a new request to the bdd)
      }
    );
    this.activeModal.close('success');  
  }
}
