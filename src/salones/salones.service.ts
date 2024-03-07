/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Salon } from './entities/salon.entity';
import { Edificio } from './entities/edificio.entity';
import { Piso } from './entities/piso.entity';

@Injectable()
export class SalonesService {

    constructor(
        @InjectRepository(Edificio) private edificioRepository: Repository<Edificio>,
        @InjectRepository(Piso) private pisoRepository: Repository<Piso>,
        @InjectRepository(Salon) private salonRepository: Repository<Salon>
    ) {}

    async obtenerSalonesPorEdificioYPiso(idEdificio: number, numPiso: number): Promise<Salon[]> {
        const edificio = await this.edificioRepository.findOne({
            where: {
                id: idEdificio
            }
        });
        const piso = await this.pisoRepository.findOne({
            where: { 
                edificio: edificio,
                id: numPiso 
            },
        });
    
        if (!piso) {
            throw new Error(`No se encontró el piso ${numPiso} en el edificio ${idEdificio}`);
        }
    
        const salones = await this.salonRepository.find({
            where: {
                piso: piso
            } 
        });
        return salones;
    }
}
