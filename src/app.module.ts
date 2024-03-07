/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonesModule } from './salones/salones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({  //configurcion de PostgreSQL
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_BASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}', __dirname + '/**/**/*.entity{.ts,.js}' ],
    synchronize: true,
  }),
  SalonesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
