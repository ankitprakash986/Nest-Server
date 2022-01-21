import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './controllers/account/account.controller';
import { ProductSearchController } from './controllers/product-search/product-search.controller';

import { OrderSchema } from './Models/order';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from './Models/user';
import { CategorySchema } from './Models/category';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/'),DatabaseModule,MongooseModule.forFeature([{ name: 'Cat', schema: CategorySchema }]),
  MongooseModule.forFeature([{ name: 'UserDetail', schema: UserSchema }])],
  controllers: [AppController, AccountController,ProductSearchController],
  providers: [AppService,],
})
export class AppModule {}
