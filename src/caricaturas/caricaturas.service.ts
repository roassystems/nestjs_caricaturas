import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCaricaturaDto } from './dto/create-caricatura.dto';
import { UpdateCaricaturaDto } from './dto/update-caricatura.dto';
import { Caricatura } from './entities/caricatura.entity';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Injectable()
export class CaricaturasService {

  constructor(
    @InjectModel(Caricatura.name)
    private readonly caricaturaModelo: Model<Caricatura>
  ) {

  }

  async create(createCaricaturaDto: CreateCaricaturaDto) {
    //return 'This action adds a new caricatura';
    createCaricaturaDto.name = createCaricaturaDto.name.toLowerCase();
    try {
      const aregistrar = await this.caricaturaModelo.create(createCaricaturaDto);
      return aregistrar;
    } catch (error) {
      this.hanledException(error);
    }
  }

  findAll(paginationDTO:PaginationDTO) {
    const {limit=10, offset=0} = paginationDTO;
    return this.caricaturaModelo.find()
      .limit( limit )
      .skip( offset )
      .sort({
        no: 1
      })
      .select('-__v');
  }

  async findOne(term: string) {
    let buscado = Caricatura;
    //busqueda por diversos criterios
    //busqueda por campo no
    if (!isNaN(+term)) {
      buscado = await this.caricaturaModelo.findOne({ no: term })

    }
    //busqueda por mongo id 
    if (!buscado && isValidObjectId(term)) {
      buscado = await this.caricaturaModelo.findById(term);
    }
    // busqueda por name
    if (!buscado) {
      buscado = await this.caricaturaModelo.findOne({ name: term.toLowerCase().trim() });
    }
    if (!buscado) throw new NotFoundException(`caricatura con term, no, o name ${term} not found`);
    return buscado;
  }

  async update(term: string, updateCaricaturaDto: UpdateCaricaturaDto) {


    const caricatura = await this.findOne(term);
    if (updateCaricaturaDto.name) {
      updateCaricaturaDto.name = updateCaricaturaDto.name.toLowerCase();
    }
    try {
      //const actualizado = await this.caricaturaModelo.updateOne(updateCaricaturaDto,{new:true});
      const actualizado = await this.caricaturaModelo.updateOne(updateCaricaturaDto);
      return actualizado;
    } catch (error) {
      this.hanledException(error);
    }

  }

  async remove( id: string) {
    const { deletedCount } = await this.caricaturaModelo.deleteOne({ _id: id });
    if ( deletedCount === 0 )
      throw new BadRequestException(`Pokemon with id "${ id }" not found`);

    return;
  }

  private hanledException(error: any):never {
    if (error.code === 11000) {

      throw new BadRequestException(`caricatura existe en base de datos ${JSON.stringify(error.keyValue)}`);
      console.log(error);
    }
    throw new InternalServerErrorException('Error no se pudo crear/actualizar en bd, Check Server Logs ');
  }
}
