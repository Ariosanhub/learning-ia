import { Controller, Get } from '@nestjs/common';
import { GoalsService, Goal } from './goals.service';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  list(): { data: Goal[] } {
    return { data: this.goalsService.list() };
  }
}
