'use client';

import { FormEvent, useMemo, useState } from 'react';

const STATUS_ORDER = ['Planejamento', 'Em Progresso', 'Revisão', 'Concluído'] as const;
const PRIORITIES = ['Alta', 'Média', 'Baixa'] as const;

type Status = (typeof STATUS_ORDER)[number];
type Priority = (typeof PRIORITIES)[number];

interface Task {
  id: string;
  title: string;
  status: Status;
  owner: string;
  dueDate: string;
  priority: Priority;
}

const DEFAULT_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Lançar campanha de onboarding',
    status: 'Planejamento',
    owner: 'Maria Silva',
    dueDate: '12/03/2024',
    priority: 'Alta'
  },
  {
    id: 't2',
    title: 'Mapear fluxos críticos de atendimento',
    status: 'Em Progresso',
    owner: 'João Pereira',
    dueDate: '18/03/2024',
    priority: 'Média'
  },
  {
    id: 't3',
    title: 'Workshop Cultura que Performar',
    status: 'Concluído',
    owner: 'Ana Costa',
    dueDate: '05/03/2024',
    priority: 'Alta'
  }
];

interface TaskFormState {
  title: string;
  owner: string;
  status: Status;
  dueDate: string;
  priority: Priority;
}

const INITIAL_FORM: TaskFormState = {
  title: '',
  owner: '',
  status: 'Planejamento',
  dueDate: '',
  priority: 'Média'
};

export const TaskBoard = () => {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [form, setForm] = useState<TaskFormState>(INITIAL_FORM);

  const tasksByStatus = useMemo(() => {
    return STATUS_ORDER.reduce<Record<Status, Task[]>>((acc, status) => {
      acc[status] = tasks.filter((task) => task.status === status);
      return acc;
    }, {} as Record<Status, Task[]>);
  }, [tasks]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim() || !form.owner.trim() || !form.dueDate.trim()) {
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      ...form
    };

    setTasks((current) => [...current, newTask]);
    setForm(INITIAL_FORM);
  };

  const advanceStatus = (taskId: string) => {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== taskId) return task;
        const index = STATUS_ORDER.indexOf(task.status);
        const nextStatus = STATUS_ORDER[Math.min(index + 1, STATUS_ORDER.length - 1)];
        return { ...task, status: nextStatus };
      })
    );
  };

  const moveTaskTo = (taskId: string, status: Status) => {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Sprint Atual · Squad Growth</h2>
          <p className="text-sm text-slate-500">
            Capture tarefas, organize automações e acompanhe status em tempo real. Salve views para compartilhar com o time.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className={`rounded-lg border px-3 py-2 text-sm ${viewMode === 'kanban' ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]' : 'border-slate-300 text-slate-500'}`}
            onClick={() => setViewMode('kanban')}
          >
            Kanban
          </button>
          <button
            className={`rounded-lg border px-3 py-2 text-sm ${viewMode === 'table' ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]' : 'border-slate-300 text-slate-500'}`}
            onClick={() => setViewMode('table')}
          >
            Tabela
          </button>
        </div>
      </header>

      <form className="grid gap-4 rounded-xl border border-dashed border-[color:var(--color-primary)] bg-white p-4 shadow-sm" onSubmit={handleSubmit}>
        <h3 className="text-sm font-semibold uppercase text-slate-600">Adicionar ação da sprint</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <label className="flex flex-col gap-1 text-sm">
            <span>Título</span>
            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Ex.: Automatizar follow-up de onboarding"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Responsável</span>
            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Nome da pessoa"
              value={form.owner}
              onChange={(event) => setForm((prev) => ({ ...prev, owner: event.target.value }))}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Entrega</span>
            <input
              type="date"
              className="rounded-lg border border-slate-300 px-3 py-2"
              value={form.dueDate}
              onChange={(event) => setForm((prev) => ({ ...prev, dueDate: event.target.value }))}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Status</span>
            <select
              className="rounded-lg border border-slate-300 px-3 py-2"
              value={form.status}
              onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as Status }))}
            >
              {STATUS_ORDER.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Prioridade</span>
            <select
              className="rounded-lg border border-slate-300 px-3 py-2"
              value={form.priority}
              onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value as Priority }))}
            >
              {PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="primary">
            Registrar ação
          </button>
        </div>
      </form>

      {viewMode === 'kanban' ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STATUS_ORDER.map((status) => (
            <div key={status} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase text-slate-600">{status}</h3>
                <span className="text-xs text-slate-400">{tasksByStatus[status].length} tarefas</span>
              </div>
              <div className="mt-3 flex flex-col gap-3">
                {tasksByStatus[status].map((task) => (
                  <article key={task.id} className="rounded-lg border border-slate-100 p-3 transition hover:border-[color:var(--color-primary)]">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm font-semibold">{task.title}</span>
                      <span className="text-xs rounded-full bg-slate-100 px-2 py-1">{task.priority}</span>
                    </div>
                    <div className="mt-2 flex flex-col gap-1 text-xs text-slate-500">
                      <span>Responsável: {task.owner}</span>
                      <span>Entrega: {formatDate(task.dueDate)}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      {STATUS_ORDER.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => moveTaskTo(task.id, option)}
                          className={`rounded-full border px-2 py-1 ${
                            option === task.status
                              ? 'border-[color:var(--color-primary)] text-[color:var(--color-primary)]'
                              : 'border-slate-200 text-slate-400'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {task.status !== 'Concluído' && (
                      <button
                        type="button"
                        className="mt-3 w-full rounded-lg border border-[color:var(--color-secondary)] px-2 py-1 text-xs text-[color:var(--color-secondary)]"
                        onClick={() => advanceStatus(task.id)}
                      >
                        Avançar etapa
                      </button>
                    )}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Tarefa</th>
                <th className="px-4 py-3">Responsável</th>
                <th className="px-4 py-3">Entrega</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Prioridade</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-700">{task.title}</td>
                  <td className="px-4 py-3 text-slate-600">{task.owner}</td>
                  <td className="px-4 py-3 text-slate-600">{formatDate(task.dueDate)}</td>
                  <td className="px-4 py-3">
                    <select
                      className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
                      value={task.status}
                      onChange={(event) => moveTaskTo(task.id, event.target.value as Status)}
                    >
                      {STATUS_ORDER.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{task.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

function formatDate(input: string) {
  if (!input) return '—';
  if (input.includes('/')) return input;
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return new Intl.DateTimeFormat('pt-BR').format(date);
}
