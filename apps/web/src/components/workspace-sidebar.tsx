'use client';

import { FC } from 'react';

type Props = {
  activeModule: 'work' | 'okr' | 'people';
  onChange: (module: 'work' | 'okr' | 'people') => void;
};

const MODULES: Array<{ key: 'work' | 'okr' | 'people'; label: string; description: string }> = [
  { key: 'work', label: 'Operações', description: 'Projetos, tarefas, automações' },
  { key: 'okr', label: 'Metas & OKRs', description: 'Objetivos, KRs e progresso' },
  { key: 'people', label: 'Pessoas & Feedbacks', description: 'Feedback contínuo, 1:1s e elogios' }
];

export const WorkspaceSidebar: FC<Props> = ({ activeModule, onChange }) => {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 p-4 flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold text-[color:var(--color-primary)]">CultureUP</h1>
        <p className="text-sm text-slate-500">Elevando Cultura. Potencializando Resultados.</p>
      </div>
      <nav className="flex flex-col gap-2">
        {MODULES.map((module) => (
          <button
            key={module.key}
            onClick={() => onChange(module.key)}
            className={`text-left rounded-lg border transition-all p-3 ${
              activeModule === module.key
                ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary)]/10'
                : 'border-transparent hover:bg-slate-100'
            }`}
          >
            <span className="block font-medium text-sm">{module.label}</span>
            <span className="block text-xs text-slate-500">{module.description}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto text-xs text-slate-400 leading-relaxed">
        <p>
          Veja o que está acontecendo em toda a empresa: people analytics, indicadores, feedbacks e execução em um só lugar.
        </p>
      </div>
    </aside>
  );
};
