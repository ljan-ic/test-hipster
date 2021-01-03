import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OmniUserController } from '../web/rest/omni-user.controller';
import { OmniUserRepository } from '../repository/omni-user.repository';
import { OmniUserService } from '../service/omni-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([OmniUserRepository])],
  controllers: [OmniUserController],
  providers: [OmniUserService],
  exports: [OmniUserService]
})
export class OmniUserModule {}
