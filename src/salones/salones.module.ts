/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SalonesController } from './salones.controller';
import { SalonesService } from './salones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edificio } from './entities/edificio.entity';
import { Piso } from './entities/piso.entity';
import { Salon } from './entities/salon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Edificio, Piso, Salon]),
  ],
  controllers: [SalonesController],
  providers: [SalonesService]
})
export class SalonesModule {}
