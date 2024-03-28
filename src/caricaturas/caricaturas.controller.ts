import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CaricaturasService } from './caricaturas.service';
import { CreateCaricaturaDto } from './dto/create-caricatura.dto';
import { UpdateCaricaturaDto } from './dto/update-caricatura.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
//import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('caricaturas')
export class CaricaturasController {
  constructor(private readonly caricaturasService: CaricaturasService) {}

  @Post()
  create(@Body() createCaricaturaDto: CreateCaricaturaDto) {
    return this.caricaturasService.create(createCaricaturaDto);
  }

  @Get()
  findAll(@Query() paginationDTO:PaginationDTO) {
    console.log(paginationDTO);
    return this.caricaturasService.findAll(paginationDTO);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.caricaturasService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateCaricaturaDto: UpdateCaricaturaDto) {
    return this.caricaturasService.update(term, updateCaricaturaDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.caricaturasService.remove( id );
  }
}
