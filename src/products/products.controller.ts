import { Controller, Post } from '@nestjs/common';

@Controller('products')
export class ProductController {
  @Post()
  addProduct(): any {}
}
