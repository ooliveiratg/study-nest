import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from 'src/tasks/task.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TaskModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
