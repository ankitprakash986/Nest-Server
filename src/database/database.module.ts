import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import * as mongoose from 'mongoose';
import { databaseProviders } from './database.provider';
@Module({
  providers: [DatabaseService],
})
export class DatabaseModule {}
