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
}
