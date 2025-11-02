import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './tasks/task.module';
import { GoalsModule } from './goals/goals.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AutomationsModule } from './automations/automations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TaskModule,
    GoalsModule,
    FeedbackModule,
    AutomationsModule
  ]
})
export class AppModule {}
