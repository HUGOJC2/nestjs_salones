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

    async actualizarEstadoSalon(id: number, nuevoEstado: string): Promise<Salon> {
        const salon = await this.salonRepository.findOne({
             where: {
                id: id 
            } 
        });
        if (!salon) {
          // Manejar el caso cuando no se encuentra el salón
          throw new Error(`No se encontró el salón con id ${id}`);
        }
    
        salon.estado = nuevoEstado;
        const salonActualizado = await this.salonRepository.save(salon);
        return salonActualizado;
    }

    async obtenerConteoEstados(): Promise<{ OFF: number; ON: number; }> {
        const conteo = await this.salonRepository
          .createQueryBuilder('salon')
          .select('estado, COUNT(*) as count')
          .addGroupBy('estado')
          .getRawMany();
      
        const resultado = { OFF: 0, ON: 0, salonesLibres: [] };
      
        conteo.forEach((item: any) => {
          if (item.estado === 'OFF') {
            resultado.OFF = item.count;
          } else if (item.estado === 'ON') {
            resultado.ON = item.count;
          }
        });
      
        return resultado;
    }

    async obtenerSalonesConEstadoOFF() {
        const salones = await this.salonRepository.find({
          where: { estado: 'OFF' },
          relations: ['piso', 'piso.edificio'],
        });
    
        const salonesConEdificioYPiso = salones.reduce((acc, salon) => {
          const { id: pisoId, edificio } = salon.piso;
          const { id: edificioId, nombre: nombreEdificio } = edificio;
    
          const pisoExistente = acc.find((item) => item.piso.id === pisoId);
    
          if (pisoExistente) {
            pisoExistente.salones.push({
              id: salon.id,
              nombre: salon.nombre,
              estado: salon.estado,
              laboratorio: salon.laboratorio,
            });
          } else {
            acc.push({
              piso: { id: pisoId },
              edificio: { id: edificioId, nombre: nombreEdificio },
              salones: [
                {
                  id: salon.id,
                  nombre: salon.nombre,
                  estado: salon.estado,
                  laboratorio: salon.laboratorio,
                },
              ],
            });
          }
    
          return acc;
        }, []);
    
        return salonesConEdificioYPiso.map((item) => ({
          ...item,
          cantidadSalonesOFF: item.salones.length,
        }));
    }
}
