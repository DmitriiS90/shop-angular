import { ProductsService } from './../../services/products.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss']
})
export class DialogWindowComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? ''),
    price: new FormControl(this.data?.price ?? ''),
    year: new FormControl(this.data?.year ?? ''),
    chip: new FormControl(this.data?.chip ?? ''),
    ssd: new FormControl(this.data?.ssd ?? ''),
    memory: new FormControl(this.data?.memory ?? ''),
    display: new FormControl(this.data?.display ?? ''),
  })

  constructor(
    public dialogRef: MatDialogRef<DialogWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.myForm.value);
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      year: this.myForm.value.year,
      image: "assets/images/imac.jpg",
      configure: {
        chip: this.myForm.value.chip,
        ssd: this.myForm.value.ssd,
        memory: this.myForm.value.memory,
        display: this.myForm.value.display,
      }

    }
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {

  }
}
