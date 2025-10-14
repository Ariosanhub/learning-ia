import { Controller, Get } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  list() {
    return { data: this.feedbackService.list() };
  }
}
