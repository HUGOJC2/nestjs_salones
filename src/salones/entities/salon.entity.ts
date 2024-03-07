/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Piso } from "./piso.entity";

@Entity()
export class Salon{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numero: number;

    @Column()
    estado: string;

    @ManyToOne(()=> Piso, (piso) => piso.salones)
    piso: Piso
}