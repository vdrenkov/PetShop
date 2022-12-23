import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AnimalModule } from './animal/animal.module';

@Module({
  imports: [ConfigModule.forRoot(), AnimalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
