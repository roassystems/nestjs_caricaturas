import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CaricaturasModule } from 'src/caricaturas/caricaturas.module';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[CaricaturasModule, CommonModule,AuthModule]
})
export class SeedModule {}
