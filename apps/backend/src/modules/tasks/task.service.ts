import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export type Task = {
  id: string;
  title: string;
  status: string;
  assignees: string[];
  dueAt?: string;
};

const seedTasks: Task[] = [
  {
    id: uuid(),
    title: 'Planejar rollout do workspace',
    status: 'Em Progresso',
    assignees: ['user-1'],
    dueAt: new Date().toISOString()
  }
];

@Injectable()
export class TaskService {
  private tasks = [...seedTasks];

  list(): Task[] {
    return this.tasks;
  }

  create(payload: Pick<Task, 'title' | 'status' | 'assignees'> & { dueAt?: string }): Task {
    const task: Task = {
      id: uuid(),
      ...payload
    };
    this.tasks.push(task);
    return task;
  }
}
