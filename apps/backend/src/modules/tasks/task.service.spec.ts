import { TaskService } from './task.service';

describe('TaskService', () => {
  it('cria tarefa com id', () => {
    const service = new TaskService();
    const task = service.create({ title: 'Teste', status: 'Novo', assignees: [] });
    expect(task.id).toBeDefined();
  });
});
