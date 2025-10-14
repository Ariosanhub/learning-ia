import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService, Task } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  list(): { data: Task[] } {
    return { data: this.taskService.list() };
  }

  @Post()
  create(@Body() body: { title: string; status: string; assignees: string[]; dueAt?: string }): { data: Task } {
    return { data: this.taskService.create(body) };
  }
}
