import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('api/seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  

  @Get()
  executeSeed() {
    return this.seedService.executedSeed();
  }

  
}
