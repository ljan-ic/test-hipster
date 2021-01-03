import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConferenceController } from '../web/rest/conference.controller';
import { ConferenceRepository } from '../repository/conference.repository';
import { ConferenceService } from '../service/conference.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConferenceRepository])],
  controllers: [ConferenceController],
  providers: [ConferenceService],
  exports: [ConferenceService]
})
export class ConferenceModule {}
