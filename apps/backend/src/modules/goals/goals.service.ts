import { Injectable } from '@nestjs/common';

export type Goal = {
  id: string;
  title: string;
  progress: number;
  timeframeStart: string;
  timeframeEnd: string;
};

const demoGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Escalar receita recorrente em 30%',
    progress: 0.62,
    timeframeStart: '2024-04-01',
    timeframeEnd: '2024-06-30'
  }
];

@Injectable()
export class GoalsService {
  private goals = [...demoGoals];

  list(): Goal[] {
    return this.goals;
  }
}
