import { Injectable } from '@nestjs/common';

export type AutomationRule = {
  id: string;
  trigger: string;
  actions: string[];
};

const rules: AutomationRule[] = [
  {
    id: 'auto-1',
    trigger: 'task.status_changed',
    actions: ['notify.slack', 'task.assign']
  }
];

@Injectable()
export class AutomationsService {
  list(): AutomationRule[] {
    return rules;
  }
}
