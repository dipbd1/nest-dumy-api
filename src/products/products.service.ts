import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.model';
@Injectable()
export class ProductService {
  private products: Product[] = [];
  insertProduct(title: string, desc: string, price: number): string {
    const prodID = Math.random().toString();
    const newProduct = new Product(prodID, title, desc, price);
    this.products.push(newProduct);
    return prodID;
  }

  getAllProducts() {
    return [...this.products];
  }

  getSingleProduct(productID: string) {
    const product = this.products.find((prod) => prod.id === productID);
    if (!product) {
      throw new NotFoundException('Couldn not find product');
    }
    return { ...product };
  }

  updateProduct(productID: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productID);
    const updateProduct = { ...product };
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.description = desc;
    }
    if (price) {
      updateProduct.price = price;
    }
    this.products[index] = updateProduct;
  }

  deleteProduct(productID: string) {
    const [product, index] = this.findProduct(productID);
    this.products.splice(index, 1);
  }

  private findProduct(productID: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (prod) => prod.id === productID,
    );
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Couldn not find product');
    }
    return [product, productIndex];
  }
}
