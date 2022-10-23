import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShapesService } from 'src/app/Services/shapes.service';
import { DrawingsService } from 'src/app/Services/drawings.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-shapes-table',
  templateUrl: './shapes-table.component.html',
  styleUrls: ['./shapes-table.component.css']
})
export class ShapesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  @Input() drawing: any;
  @Input() public drawingId!: number; 
  public shapes: any[]=[];
  public shape: any;
  public choosingShape: boolean = false;
  listData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['select','id', 'type', 'base', 'depth', 'height', 'side1', 'side2', 'x', 'y', 'perimeter', 'area', 'volume', 'edit'];
  selection = new SelectionModel<any>(false, []);

  constructor(private shapesService: ShapesService,
              private drawingsService: DrawingsService,
              public activeModal: NgbActiveModal,
              private modalService: NgbModal
    ) { }
  

  ngOnInit(): void {
    this.getShapes();
  }

  public getShapes() {
    this.shapesService.getAllShapes().subscribe(
      (response) => {
        this.shapes = response;
        this.listData = new MatTableDataSource(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  addShape(idShape: number){
    this.drawingsService.addOneShapeToDrawing(this.drawingId, idShape ).subscribe(  // add one shape to drawing in the BDD
      res => {
        this.drawing.listShape.push(res); // to put the added shape into the list for the front(to refresh data for the front without a new request to the bdd)
        this.activeModal.close(res);
      }
    );
  }

  

}
