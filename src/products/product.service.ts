import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  create(dto: CreateProductDto) {
    const producto = this.repo.create(dto);
    return this.repo.save(producto);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const producto = await this.repo.findOneBy({ id });
    if (!producto) throw new NotFoundException();
    return producto;
  }

  async update(id: string, dto: UpdateProductDto) {
    const producto = await this.findOne(id);
    Object.assign(producto, dto);
    return this.repo.save(producto);
  }

  async remove(id: string) {
    const producto = await this.findOne(id);
    return this.repo.remove(producto);
  }
}