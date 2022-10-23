import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypesService } from '../../services/types.service';
import { DemandeBody } from '../../models/demandeBody';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-demande-date',
  templateUrl: './demande-date.component.html',
  styleUrls: ['./demande-date.component.css']
})
export class DemandeDateComponent implements OnInit {

  types: Array<any> = [];
  token!: String | null;
  constructor(
    private typesService: TypesService,
    public dialogRef: MatDialogRef<DemandeDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DemandeBody,
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem("accessToken");
    this.typesService.getAllTypes(this.token).subscribe(
      (response: any) => {
        this.types = response;
      }
    )
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  addDemande() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showCancelButton: true,
      confirmButtonText: 'Save',
      type: "warning"
    } as any).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.value) {
        Swal.fire('Saved!', '', 'success')
        this.dialogRef.close(this.data);
      } else if (result.dismiss) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

}
