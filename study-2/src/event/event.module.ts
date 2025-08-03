import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { CreateEventRepository } from './repository/create-event-repository';
import { CreateEventService } from './services/create-event.service';

@Module({
  controllers: [EventController],
  providers: [CreateEventRepository, CreateEventService],
  exports: [CreateEventService],
})
export class EventModule {}
