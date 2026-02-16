import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { PrismaService } from 'src/app/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(paginationDto?: PaginationDto) {
    if (!paginationDto) return null;
    const { limit = 10, offset = 0 } = paginationDto;
    const allTasks = await this.prisma.task.findMany({
      take: limit,
      skip: offset,
    });
    return allTasks;
  }

  async listOneTask(id: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id,
      },
    });

    if (!task) {
      throw new HttpException('Tarefa não encontrada', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto) {
    const newITask = await this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        description: createTaskDto.description,
        completed: false,
      },
    });
    return newITask;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    //findIndex devolve a posição do index no array
    const findTask = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    if (!findTask) {
      throw new NotFoundException('Usuario não encontrado');
    }

    const task = await this.prisma.task.update({
      where: {
        id: findTask.id,
      },
      data: updateTaskDto,
    });

    return task;
  }

  async delete(id: number) {
    const findTask = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    if (!findTask) {
      throw new NotFoundException('Usuario não encontrado');
    }

    const task = await this.prisma.task.delete({
      where: {
        id: findTask.id,
      },
    });
    return task;
  }
}
