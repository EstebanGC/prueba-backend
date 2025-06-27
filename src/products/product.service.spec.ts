import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

const mockProduct = {
  id: 'uuid-mock',
  nombre: 'Producto Test',
  precio: 1000,
  stock: 10,
};

const mockRepo = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockResolvedValue(mockProduct),
  find: jest.fn().mockResolvedValue([mockProduct]),
  findOneBy: jest.fn().mockResolvedValue(mockProduct),
  remove: jest.fn().mockResolvedValue(mockProduct),
};

describe('ProductService', () => {
  let service: ProductService;
  let repo: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const dto = {
      nombre: 'Producto Test',
      precio: 1000,
      stock: 10,
    };

    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockProduct);
  });

  it('should return all products', async () => {
    const result = await service.findAll();
    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual([mockProduct]);
  });
});
