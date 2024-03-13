/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { SalonesService } from './salones.service';
import { Salon } from './entities/salon.entity';

@Controller('salones')
export class SalonesController {
    constructor(private readonly salonService: SalonesService) {}

    @Get(':idEdificio/:numPiso')
    async obtenerSalonesPorEdificioYPiso(@Param('idEdificio') idEdificio: number, @Param('numPiso') numPiso: number): Promise<Salon[]> {
        return this.salonService.obtenerSalonesPorEdificioYPiso(idEdificio, numPiso);
    }

    @Put(':id')
    async actualizarEstadoSalon(@Param('id') id: number, @Body('estado') nuevoEstado: string) {
        const salon = await this.salonService.actualizarEstadoSalon(id, nuevoEstado);
        return { mensaje: 'Estado actualizado correctamente', salon };
    }

    @Get('/obtener-conteo-estados')
    obtenerConteoEstados(): Promise<{ OFF: number; ON: number }> {
        return this.salonService.obtenerConteoEstados();
    }

    @Get('/libres')
    async obtenerSalonesOFF() {
        return this.salonService.obtenerSalonesConEstadoOFF();
    }
}
