import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    // const newProduct = {
    //   id: this.counterId,
    //   ...data,
    // };
    // this.products.push(newProduct);
    // return newProduct;
  }

  update(id: number, changes: UpdateProductDto) {
    // const product = this.findOne(id);
    // const index = this.products.findIndex((item) => item.id === id);
    // this.products[index] = {
    //   ...product,
    //   ...changes,
    // };
    // return this.products[index];
  }

  async remove(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    // this.productModel.remove() .splice(index, 1);
    return true;
  }
}
