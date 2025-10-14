'use client';

import { FormEvent, useMemo, useState } from 'react';

type FeedbackType = 'Elogio' | 'Feedback Contínuo' | 'Pedido de Feedback';
type Visibility = 'Público' | 'Privado';

type Feedback = {
  id: string;
  type: FeedbackType;
  giver: string;
  receiver: string;
  value: string;
  message: string;
  visibility: Visibility;
};

type OneOnOneAction = {
  id: string;
  description: string;
  done: boolean;
};

type OneOnOneState = {
  cadence: string;
  nextSession: string;
  agenda: string[];
  actions: OneOnOneAction[];
};

const INITIAL_FEEDBACKS: Feedback[] = [
  {
    id: 'fb1',
    type: 'Elogio',
    giver: 'Marcos Lima',
    receiver: 'Patrícia Souza',
    value: 'Foco no Cliente',
    message: 'Entrega impecável no rollout do portal do cliente. Time se inspirou na sua liderança.',
    visibility: 'Público'
  },
  {
    id: 'fb2',
    type: 'Feedback Contínuo',
    giver: 'Patrícia Souza',
    receiver: 'Marcos Lima',
    value: 'Ownership',
    message: 'Vamos ajustar o playbook de follow-up para reduzir tempo de resposta.',
    visibility: 'Privado'
  }
];

const INITIAL_ONE_ON_ONE: OneOnOneState = {
  cadence: 'Quinzenal',
  nextSession: '20/03/2024',
  agenda: ['Celebrar conquistas do sprint', 'Desbloquear gargalos de processos', 'Alinhar próximos OKRs'],
  actions: [
    { id: 'act1', description: 'Documentar novos rituais no Doc CulturaUP', done: false },
    { id: 'act2', description: 'Criar automação para alertar atrasos', done: false }
  ]
};

interface FeedbackFormState {
  type: FeedbackType;
  giver: string;
  receiver: string;
  value: string;
  visibility: Visibility;
  message: string;
}

const INITIAL_FEEDBACK_FORM: FeedbackFormState = {
  type: 'Elogio',
  giver: '',
  receiver: '',
  value: '',
  visibility: 'Público',
  message: ''
};

export const FeedbackPanel = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(INITIAL_FEEDBACKS);
  const [feedbackForm, setFeedbackForm] = useState<FeedbackFormState>(INITIAL_FEEDBACK_FORM);
  const [oneOnOne, setOneOnOne] = useState<OneOnOneState>(INITIAL_ONE_ON_ONE);
  const [newAgendaItem, setNewAgendaItem] = useState('');
  const [newAction, setNewAction] = useState('');

  const publicPraiseCount = useMemo(
    () => feedbacks.filter((item) => item.type === 'Elogio' && item.visibility === 'Público').length,
    [feedbacks]
  );
  const privateFeedbackCount = useMemo(
    () => feedbacks.filter((item) => item.visibility === 'Privado').length,
    [feedbacks]
  );

  const handleFeedbackSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!feedbackForm.giver.trim() || !feedbackForm.receiver.trim() || !feedbackForm.message.trim()) {
      return;
    }

    const newFeedback: Feedback = {
      id: crypto.randomUUID(),
      ...feedbackForm
    };

    setFeedbacks((current) => [newFeedback, ...current]);
    setFeedbackForm(INITIAL_FEEDBACK_FORM);
  };

  const toggleAction = (actionId: string) => {
    setOneOnOne((current) => ({
      ...current,
      actions: current.actions.map((action) =>
        action.id === actionId ? { ...action, done: !action.done } : action
      )
    }));
  };

  const handleAgendaAdd = () => {
    if (!newAgendaItem.trim()) return;
    setOneOnOne((current) => ({ ...current, agenda: [...current.agenda, newAgendaItem.trim()] }));
    setNewAgendaItem('');
  };

  const handleActionAdd = () => {
    if (!newAction.trim()) return;
    setOneOnOne((current) => ({
      ...current,
      actions: [...current.actions, { id: crypto.randomUUID(), description: newAction.trim(), done: false }]
    }));
    setNewAction('');
  };

  return (
    <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Feedbacks & Elogios · Semana Atual</h2>
            <p className="text-sm text-slate-500">
              Estruture rituais contínuos de reconhecimento e desenvolvimento com templates guiados.
            </p>
          </div>
          <div className="grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
            <span className="rounded-lg border border-slate-200 px-3 py-2 text-center">
              {publicPraiseCount} elogios públicos
            </span>
            <span className="rounded-lg border border-slate-200 px-3 py-2 text-center">
              {privateFeedbackCount} feedbacks privados
            </span>
          </div>
        </header>

        <form className="mt-6 grid gap-4 rounded-xl border border-dashed border-[color:var(--color-secondary)] p-4" onSubmit={handleFeedbackSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              <span>Tipo</span>
              <select
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={feedbackForm.type}
                onChange={(event) => setFeedbackForm((prev) => ({ ...prev, type: event.target.value as FeedbackType }))}
              >
                <option value="Elogio">Elogio alinhado aos valores</option>
                <option value="Feedback Contínuo">Feedback contínuo</option>
                <option value="Pedido de Feedback">Pedido de feedback</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>Visibilidade</span>
              <select
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={feedbackForm.visibility}
                onChange={(event) => setFeedbackForm((prev) => ({ ...prev, visibility: event.target.value as Visibility }))}
              >
                <option value="Público">Público para o time</option>
                <option value="Privado">Privado</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>Quem envia?</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Seu nome"
                value={feedbackForm.giver}
                onChange={(event) => setFeedbackForm((prev) => ({ ...prev, giver: event.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>Para quem?</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Pessoa ou time"
                value={feedbackForm.receiver}
                onChange={(event) => setFeedbackForm((prev) => ({ ...prev, receiver: event.target.value }))}
              />
            </label>
          </div>
          <label className="flex flex-col gap-1 text-sm">
            <span>Valor ou competência reforçada</span>
            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Ex.: Foco no Cliente"
              value={feedbackForm.value}
              onChange={(event) => setFeedbackForm((prev) => ({ ...prev, value: event.target.value }))}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span>Mensagem</span>
            <textarea
              className="h-28 rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Escreva um feedback específico, com contexto e próximos passos."
              value={feedbackForm.message}
              onChange={(event) => setFeedbackForm((prev) => ({ ...prev, message: event.target.value }))}
            />
          </label>
          <div className="flex justify-end">
            <button type="submit" className="primary">
              Registrar feedback
            </button>
          </div>
        </form>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {feedbacks.map((item) => (
            <article key={item.id} className="rounded-xl border border-slate-100 p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[color:var(--color-secondary)]">{item.type}</span>
                <span className="text-slate-400">{item.visibility}</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold">
                {item.giver} → {item.receiver}
              </h3>
              {item.value && <p className="text-xs text-slate-500">Valor: {item.value}</p>}
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.message}</p>
            </article>
          ))}
        </div>
      </div>

      <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <header>
          <h3 className="text-sm font-semibold uppercase text-slate-600">Ritual 1:1 · {oneOnOne.cadence}</h3>
          <p className="text-xs text-slate-500">Próxima sessão: {oneOnOne.nextSession}</p>
        </header>
        <section className="mt-4 flex flex-col gap-3">
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-500">Agenda</h4>
            <ul className="mt-2 list-disc list-inside text-sm text-slate-600">
              {oneOnOne.agenda.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-2 flex gap-2">
              <input
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="Adicionar tópico"
                value={newAgendaItem}
                onChange={(event) => setNewAgendaItem(event.target.value)}
              />
              <button
                type="button"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                onClick={handleAgendaAdd}
              >
                Incluir
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase text-slate-500">Ações de follow-up</h4>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              {oneOnOne.actions.map((action) => (
                <li key={action.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={action.done}
                    onChange={() => toggleAction(action.id)}
                  />
                  <span className={action.done ? 'line-through text-slate-400' : ''}>{action.description}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex gap-2">
              <input
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="Adicionar ação"
                value={newAction}
                onChange={(event) => setNewAction(event.target.value)}
              />
              <button
                type="button"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                onClick={handleActionAdd}
              >
                Registrar
              </button>
            </div>
          </div>
        </section>
        <footer className="mt-4 flex flex-col gap-2 text-sm">
          <button className="rounded-lg bg-[color:var(--color-success)] px-3 py-2 text-white">
            Exportar resumo da 1:1
          </button>
          <button className="rounded-lg border border-slate-300 px-3 py-2 text-slate-600">
            Configurar lembretes
          </button>
        </footer>
      </aside>
    </section>
  );
};
