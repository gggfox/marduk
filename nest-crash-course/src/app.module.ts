import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './ormconfig';
import { DataSource } from 'typeorm';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot(config), MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
