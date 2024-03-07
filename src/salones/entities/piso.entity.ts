/* eslint-disable prettier/prettier */
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Edificio } from "./edificio.entity";
import { Salon } from "./salon.entity";

@Entity()
export class Piso{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Edificio, (edificio) => edificio.pisos)
    edificio: Edificio;

    @OneToMany(()=> Salon, (salon) => salon.piso)
    salones: Salon[];
}