import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Caricatura } from 'src/caricaturas/entities/caricatura.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { PokeResponse } from './interfaces/poke-response-interface';
@Injectable()
export class SeedService {
  
  constructor(
    @InjectModel(Caricatura.name)
    private readonly caricaturaModelo: Model<Caricatura>,
    private readonly http:AxiosAdapter
  ) {

  }
  
  async executedSeed() {

    await this.caricaturaModelo.deleteMany({}); // delete * from pokemons;

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(({ name, url }) => {

      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];

     
      pokemonToInsert.push({ name, no }); 

    });

    await this.caricaturaModelo.insertMany(pokemonToInsert);


    return 'Seed Executed';
  }
}
