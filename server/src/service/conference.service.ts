import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ConferenceDTO } from '../service/dto/conference.dto';
import { ConferenceMapper } from '../service/mapper/conference.mapper';
import { ConferenceRepository } from '../repository/conference.repository';

const relationshipNames = [];

@Injectable()
export class ConferenceService {
  logger = new Logger('ConferenceService');

  constructor(@InjectRepository(ConferenceRepository) private conferenceRepository: ConferenceRepository) {}

  async findById(id: string): Promise<ConferenceDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.conferenceRepository.findOne(id, options);
    return ConferenceMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<ConferenceDTO>): Promise<ConferenceDTO | undefined> {
    const result = await this.conferenceRepository.findOne(options);
    return ConferenceMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<ConferenceDTO>): Promise<[ConferenceDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.conferenceRepository.findAndCount(options);
    const conferenceDTO: ConferenceDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(conference => conferenceDTO.push(ConferenceMapper.fromEntityToDTO(conference)));
      resultList[0] = conferenceDTO;
    }
    return resultList;
  }

  async save(conferenceDTO: ConferenceDTO): Promise<ConferenceDTO | undefined> {
    const entity = ConferenceMapper.fromDTOtoEntity(conferenceDTO);
    const result = await this.conferenceRepository.save(entity);
    return ConferenceMapper.fromEntityToDTO(result);
  }

  async update(conferenceDTO: ConferenceDTO): Promise<ConferenceDTO | undefined> {
    const entity = ConferenceMapper.fromDTOtoEntity(conferenceDTO);
    const result = await this.conferenceRepository.save(entity);
    return ConferenceMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.conferenceRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
