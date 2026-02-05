import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Thiago',
      description: 'aprendendo nest',
      completed: false,
    },
  ];
  findAll() {
    return this.tasks;
  }

  listOneTask(id: string) {
    return this.tasks.find((tasks) => tasks.id === Number(id));
  }

  create(body: any) {
    const newId = this.tasks.length + 1;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newTasks = {
      id: newId,
      ...body,
    };
    //adicionar um item a mais
    this.tasks.push(newTasks);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return body;
  }

  update(id: string) {
    return 'atualizado: ' + id;
  }
}
