import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IProduct[]>('http://localhost:3000/products')
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(`http://localhost:3000/products/${id}`)
  }

  postProduct(product: IProduct){
    return this.http.post<IProduct>('http://localhost:3000/products', product)
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`http://localhost:3000/products/${id}`);
  }
}
