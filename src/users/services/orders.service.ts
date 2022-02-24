import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll() {
    return this.orderModel.find().populate('products').exec();
  }

  async findOne(id: string) {
    return this.orderModel.findOne({ _id: id }).populate('products');
  }

  create(data: CreateOrderDto) {
    const newModel = new this.orderModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    if (order) {
      order.products.pull(productId);
      return order.save();
    }
  }

  async addProduct(id: string, productsIds: string[]) {
    const order = await this.orderModel.findById(id);
    if (order) {
      productsIds.forEach((element) => {
        // order.products.push(element);
        order.products.addToSet(element);
      });
      return order.save();
    }
  }
}
