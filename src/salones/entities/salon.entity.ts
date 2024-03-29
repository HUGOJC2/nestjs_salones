/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Piso } from "./piso.entity";

@Entity()
export class Salon{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    estado: string;

    @Column()
    laboratorio: string;

    @ManyToOne(()=> Piso, (piso) => piso.salones)
    piso: Piso
}