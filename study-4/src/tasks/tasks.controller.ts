import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @Get()
  GetTasks() {
    return this.taskService.findAll();
  }

  @Get(':id')
  GetOneTasks(@Param('id') id: string) {
    console.log(id);
    return this.taskService.listOneTask(id);
  }

  @Post()
  CreateTask(@Body() body: any) {
    console.log(body);
    return this.taskService.create(body);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string) {
    return this.taskService.update(id);
  }
}
