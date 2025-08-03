import { Injectable } from '@nestjs/common';
import { CreateEventRepository } from '../repository/create-event-repository';
import { IEventEntity } from '../interfaces/IEventEntity';

@Injectable()
export class CreateEventService {
  constructor(
    //private = privado
    // readonly = só para a leitura
    // createEventRepository = injetando o repositório(classe)
    private readonly createEventRepository: CreateEventRepository,
  ) {}
  async execute(event: IEventEntity): Promise<IEventEntity> {
    const newEvent = await this.createEventRepository.execute(event);
    return newEvent;
  }
}
