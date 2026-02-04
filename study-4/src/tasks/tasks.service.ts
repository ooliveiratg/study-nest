import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  findAll() {
    return [{ id: 1, task: 'comprar pão' }];
  }

  listOneTask(id: string) {
    return [{ id: id, task: 'comprar pão' }];
  }
}
