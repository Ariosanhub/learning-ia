'use client';

import { FormEvent, useState } from 'react';

type MetricType = 'number' | 'percent' | 'currency' | 'task_linked';

type KeyResult = {
  id: string;
  title: string;
  metricType: MetricType;
  target: string;
  current: string;
  automatic: boolean;
};

type Objective = {
  id: string;
  title: string;
  owner: string;
  timeframe: string;
  progress: number;
  krs: KeyResult[];
};

const DEFAULT_OBJECTIVES: Objective[] = [
  {
    id: 'okr1',
    title: 'Escalar receita recorrente em 30%',
    owner: 'Growth Tribe',
    timeframe: 'Q2 · 2024',
    progress: 62,
    krs: [
      {
        id: 'kr1',
        title: 'Alcançar MRR de R$ 450k',
        metricType: 'currency',
        target: 'R$ 450k',
        current: 'R$ 320k',
        automatic: false
      },
      {
        id: 'kr2',
        title: 'Fechar 20 deals enterprise',
        metricType: 'number',
        target: '20 deals',
        current: '14',
        automatic: true
      }
    ]
  },
  {
    id: 'okr2',
    title: 'Elevar eNPS para 70+',
    owner: 'People Ops',
    timeframe: 'Q2 · 2024',
    progress: 45,
    krs: [
      {
        id: 'kr3',
        title: 'Completar 90% dos 1:1s quinzenais',
        metricType: 'percent',
        target: '90%',
        current: '82%',
        automatic: true
      },
      {
        id: 'kr4',
        title: 'Receber 120 feedbacks no trimestre',
        metricType: 'number',
        target: '120',
        current: '74',
        automatic: false
      }
    ]
  }
];

interface ObjectiveFormState {
  title: string;
  owner: string;
  timeframe: string;
  progress: number;
  krTitle: string;
  krMetricType: MetricType;
  krTarget: string;
  krAutomatic: boolean;
}

const INITIAL_OBJECTIVE_FORM: ObjectiveFormState = {
  title: '',
  owner: '',
  timeframe: 'Q3 · 2024',
  progress: 40,
  krTitle: '',
  krMetricType: 'percent',
  krTarget: '',
  krAutomatic: true
};

export const OkrPanel = () => {
  const [objectives, setObjectives] = useState<Objective[]>(DEFAULT_OBJECTIVES);
  const [form, setForm] = useState<ObjectiveFormState>(INITIAL_OBJECTIVE_FORM);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim() || !form.owner.trim()) {
      return;
    }

    const newObjective: Objective = {
      id: crypto.randomUUID(),
      title: form.title,
      owner: form.owner,
      timeframe: form.timeframe,
      progress: form.progress,
      krs:
        form.krTitle.trim() && form.krTarget.trim()
          ? [
              {
                id: crypto.randomUUID(),
                title: form.krTitle,
                metricType: form.krMetricType,
                target: form.krTarget,
                current: form.krAutomatic ? 'Auto' : '0',
                automatic: form.krAutomatic
              }
            ]
          : []
    };

    setObjectives((current) => [newObjective, ...current]);
    setForm(INITIAL_OBJECTIVE_FORM);
  };

  const updateProgress = (objectiveId: string, value: number) => {
    setObjectives((current) =>
      current.map((objective) =>
        objective.id === objectiveId ? { ...objective, progress: value } : objective
      )
    );
  };

  const updateKrCurrent = (objectiveId: string, krId: string, value: string) => {
    setObjectives((current) =>
      current.map((objective) => {
        if (objective.id !== objectiveId) return objective;
        return {
          ...objective,
          krs: objective.krs.map((kr) => (kr.id === krId ? { ...kr, current: value } : kr))
        };
      })
    );
  };

  return (
    <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-4">
        <form
          className="rounded-xl border border-dashed border-[color:var(--color-primary)] bg-white p-5 shadow-sm"
          onSubmit={handleSubmit}
        >
          <header className="mb-4">
            <h2 className="text-lg font-semibold">Adicionar objetivo trimestral</h2>
            <p className="text-sm text-slate-500">
              Conecte metas estratégicas com key results mensuráveis. Você pode vincular tarefas para atualizar automaticamente.
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              <span>Objetivo</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Ex.: Aumentar retenção de clientes enterprise"
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>Owner</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Nome do responsável"
                value={form.owner}
                onChange={(event) => setForm((prev) => ({ ...prev, owner: event.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>Timeframe</span>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2"
                value={form.timeframe}
                onChange={(event) => setForm((prev) => ({ ...prev, timeframe: event.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>Progresso estimado (%)</span>
              <input
                type="range"
                min={0}
                max={100}
                value={form.progress}
                onChange={(event) => setForm((prev) => ({ ...prev, progress: Number(event.target.value) }))}
              />
            </label>
          </div>
          <fieldset className="mt-4 grid gap-3 rounded-lg border border-slate-200 p-4 text-sm">
            <legend className="px-1 text-xs font-semibold uppercase text-slate-500">Key result opcional</legend>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span>Título</span>
                <input
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="Ex.: Reduzir churn para 4%"
                  value={form.krTitle}
                  onChange={(event) => setForm((prev) => ({ ...prev, krTitle: event.target.value }))}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span>Métrica</span>
                <select
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  value={form.krMetricType}
                  onChange={(event) => setForm((prev) => ({ ...prev, krMetricType: event.target.value as MetricType }))}
                >
                  <option value="number">Número absoluto</option>
                  <option value="percent">Percentual</option>
                  <option value="currency">Financeiro</option>
                  <option value="task_linked">Ligado a tarefas</option>
                </select>
              </label>
              <label className="flex flex-col gap-1">
                <span>Meta</span>
                <input
                  className="rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="Ex.: 120 feedbacks"
                  value={form.krTarget}
                  onChange={(event) => setForm((prev) => ({ ...prev, krTarget: event.target.value }))}
                />
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.krAutomatic}
                  onChange={(event) => setForm((prev) => ({ ...prev, krAutomatic: event.target.checked }))}
                />
                <span>Atualização automática via tarefas ou integrações</span>
              </label>
            </div>
          </fieldset>
          <div className="mt-4 flex justify-end">
            <button type="submit" className="primary">
              Criar objetivo
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-4">
          {objectives.map((objective) => (
            <article key={objective.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <header className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{objective.title}</h3>
                  <p className="text-xs text-slate-500">
                    Owner: {objective.owner} · {objective.timeframe}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={objective.progress}
                    onChange={(event) => updateProgress(objective.id, Number(event.target.value))}
                  />
                  <span className="text-2xl font-bold text-[color:var(--color-primary)]">{objective.progress}%</span>
                </div>
              </header>
              <div className="mt-4 grid gap-3">
                {objective.krs.length === 0 && (
                  <p className="text-sm text-slate-500">Adicione key results para acompanhar indicadores deste objetivo.</p>
                )}
                {objective.krs.map((kr) => (
                  <div key={kr.id} className="rounded-lg border border-slate-100 p-4 text-sm">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-semibold">{kr.title}</p>
                        <span className="text-xs uppercase text-slate-400">Métrica: {translateMetricType(kr.metricType)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Meta: {kr.target}</span>
                        <input
                          className="w-24 rounded-lg border border-slate-300 px-2 py-1 text-right text-xs"
                          value={kr.current}
                          onChange={(event) => updateKrCurrent(objective.id, kr.id, event.target.value)}
                          disabled={kr.automatic}
                        />
                      </div>
                    </div>
                    {kr.automatic && <p className="mt-2 text-xs text-[color:var(--color-secondary)]">Atualização automática conectada a tarefas.</p>}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Insights da IA</h3>
        <div className="mt-3 rounded-lg border border-dashed border-[color:var(--color-primary)] bg-slate-50 p-4 text-sm text-slate-600">
          <p>
            "O KR <strong>Fechar 20 deals enterprise</strong> desacelerou nas últimas 2 semanas. Sugestão: acionar automação para alertar responsáveis quando tarefas ficarem 5 dias sem atualização e agendar 1:1 focada em pipeline."
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <button className="rounded-lg border border-[color:var(--color-secondary)] px-3 py-2 text-sm text-[color:var(--color-secondary)]">
            Gerar pauta de 1:1 com IA
          </button>
          <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600">
            Exportar progresso (CSV)
          </button>
        </div>
      </aside>
    </section>
  );
};

function translateMetricType(metric: MetricType) {
  switch (metric) {
    case 'currency':
      return 'Financeiro';
    case 'percent':
      return 'Percentual';
    case 'task_linked':
      return 'Ligado a tarefas';
    default:
      return 'Número';
  }
}
