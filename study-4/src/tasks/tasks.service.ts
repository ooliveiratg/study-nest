import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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
    const task = this.tasks.find((task) => task.id === Number(id));
    if (task) return task;
    throw new HttpException('Não existe', HttpStatus.NOT_FOUND);
  }

  create(createTaskDto: CreateTaskDto) {
    const newId = this.tasks.length + 1;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newTasks = {
      id: newId,
      ...createTaskDto,
      completed: false,
    };
    //adicionar um item a mais
    this.tasks.push(newTasks);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return createTaskDto;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: string, updateTaskDto: UpdateTaskDto) {
    //findIndex devolve a posição do index no array
    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id));

    if (taskIndex < 0) {
      throw new HttpException('Não existe', HttpStatus.NOT_FOUND);
    }

    const taskItem = this.tasks[taskIndex];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.tasks[taskIndex] = {
      ...taskItem,
      ...updateTaskDto,
    };
    return 'tarefa atualizada';
  }

  delete(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id));

    if (taskIndex < 0) {
      throw new HttpException('Removeu', HttpStatus.NOT_FOUND);
    }
    this.tasks.splice(taskIndex, 1);
    return 'certinho';
  }
}
