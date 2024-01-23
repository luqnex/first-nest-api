import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoListModule } from './modules/todo-list/todo-list.module';

@Module({
  imports: [TodoListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
