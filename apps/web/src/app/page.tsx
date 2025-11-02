'use client';

import { useState } from 'react';
import { WorkspaceSidebar } from '../components/workspace-sidebar';
import { TaskBoard } from '../components/task-board';
import { OkrPanel } from '../components/okr-panel';
import { FeedbackPanel } from '../components/feedback-panel';

export default function HomePage() {
  const [activeModule, setActiveModule] = useState<'work' | 'okr' | 'people'>('work');

  return (
    <div className="flex min-h-screen">
      <WorkspaceSidebar activeModule={activeModule} onChange={setActiveModule} />
      <main className="flex-1 p-6 flex flex-col gap-6">
        {activeModule === 'work' && <TaskBoard />}
        {activeModule === 'okr' && <OkrPanel />}
        {activeModule === 'people' && <FeedbackPanel />}
      </main>
    </div>
  );
}
