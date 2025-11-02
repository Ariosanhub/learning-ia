import { Controller, Get } from '@nestjs/common';
import { AutomationsService, AutomationRule } from './automations.service';

@Controller('automations')
export class AutomationsController {
  constructor(private readonly automationsService: AutomationsService) {}

  @Get()
  list(): { data: AutomationRule[] } {
    return { data: this.automationsService.list() };
  }
}
