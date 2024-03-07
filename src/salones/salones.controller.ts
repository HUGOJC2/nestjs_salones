/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { SalonesService } from './salones.service';
import { Salon } from './entities/salon.entity';

@Controller('salones')
export class SalonesController {
    constructor(private readonly salonService: SalonesService) {}

    @Get(':idEdificio/:numPiso')
    async obtenerSalonesPorEdificioYPiso(@Param('idEdificio') idEdificio: number, @Param('numPiso') numPiso: number): Promise<Salon[]> {
        return this.salonService.obtenerSalonesPorEdificioYPiso(idEdificio, numPiso);
    }
}
