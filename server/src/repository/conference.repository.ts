import { EntityRepository, Repository } from 'typeorm';
import { Conference } from '../domain/conference.entity';

@EntityRepository(Conference)
export class ConferenceRepository extends Repository<Conference> {}
