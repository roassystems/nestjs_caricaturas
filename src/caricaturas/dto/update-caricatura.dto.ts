import { PartialType } from '@nestjs/mapped-types';
import { CreateCaricaturaDto } from './create-caricatura.dto';

export class UpdateCaricaturaDto extends PartialType(CreateCaricaturaDto) {}
