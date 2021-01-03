import { EntityRepository, Repository } from 'typeorm';
import { OmniUser } from '../domain/omni-user.entity';

@EntityRepository(OmniUser)
export class OmniUserRepository extends Repository<OmniUser> {}
