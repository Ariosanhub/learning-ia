import { Injectable } from '@nestjs/common';

type Feedback = {
  id: string;
  type: 'continuous' | 'request' | 'praise';
  giver: string;
  receiver: string;
  context: string;
  visibility: 'private' | 'public';
};

const feedbacks: Feedback[] = [
  {
    id: 'fb-1',
    type: 'praise',
    giver: 'Patrícia',
    receiver: 'Marcos',
    context: 'Reconhecimento por excelência no atendimento',
    visibility: 'public'
  }
];

@Injectable()
export class FeedbackService {
  list(): Feedback[] {
    return feedbacks;
  }
}
