import { DialogWindowComponent } from './../dialog-window/dialog-window.component';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './../../models/product';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: IProduct[]
  productsSubscription: Subscription
  canEdit:boolean = true
  canView:boolean = true

  constructor(private productsService: ProductsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.productsSubscription = this.productsService.getProducts().subscribe((data) => { this.products = data })
  }

  openDialog(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    // dialogConfig.data = product;

    const dialogRef = this.dialog.open(DialogWindowComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data && data.id)
          // this.updateData(data);
          this.postData(data);
        else
          this.postData(data);
      }

    });
  }

  postData(data: IProduct) {
    this.productsService.postProduct(data).subscribe((data) => this.products.push(data));
  }

  // updateData(product: IProduct) {
  //   this.productsService.updateProduct(product).subscribe((data) => {
  //     this.products = this.products.map((product) => {
  //       if (product.id === data.id) return data;
  //       else return product;
  //     });
  //   });
  // }

  deleteItem(id:number){
    this.productsService.deleteProduct(id).subscribe(() => this.products.find((item) => {
      if (id === item.id) {
        let idx = this.products.findIndex((data) => data.id === id);
        this.products.splice(idx, 1);
      }
    }));
  }

  ngOnDestroy(){
    if(this.productsSubscription) this.productsSubscription.unsubscribe()
  }
}
