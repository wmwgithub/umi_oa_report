import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { OAReportController } from './OAReport/index.controller';
import { OAReportService } from './OAReport/index.service';

@Module({
  imports: [],
  controllers: [AppController, OAReportController],
  providers: [AppService, OAReportService],
})
export class AppModule { }
