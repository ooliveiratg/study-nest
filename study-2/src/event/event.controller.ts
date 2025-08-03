import { Body, Controller, Post } from '@nestjs/common';
import { CreateEventService } from './services/create-event.service';
import type { IEventEntity } from './interfaces/IEventEntity';

@Controller('event')
export class EventController {
  constructor(private readonly createEventService: CreateEventService) {}

  @Post('create')
  async create(@Body() event: IEventEntity): Promise<IEventEntity> {
    return this.createEventService.execute(event);
  }
}
