/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Piso } from './piso.entity';

    @Entity()
    export class Edificio{
        @PrimaryGeneratedColumn()
        id: number;

        @Column({ comment: 'Nombre del edificio.' })
        nombre: string;

        @Column({ comment: 'Numero de pisos que contiene.' })
        numPisos: number;

        @OneToMany(()=> Piso, (piso) => piso.edificio)
        pisos: Piso[];
    }