import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from './image/image.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
