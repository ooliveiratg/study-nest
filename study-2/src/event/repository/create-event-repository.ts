import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventDocument } from '../schema/event.schema';
import { Model } from 'mongoose';
import { IEventEntity } from '../interfaces/IEventEntity';

@Injectable()
export class CreateEventRepository {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}
  async execute(event: IEventEntity): Promise<IEventEntity> {
    const createdEvent = new this.eventModel(event);
    await createdEvent.save();
    return createdEvent.toObject();
  }
}
