import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { OmniUserDTO } from '../service/dto/omni-user.dto';
import { OmniUserMapper } from '../service/mapper/omni-user.mapper';
import { OmniUserRepository } from '../repository/omni-user.repository';

const relationshipNames = [];

@Injectable()
export class OmniUserService {
  logger = new Logger('OmniUserService');

  constructor(@InjectRepository(OmniUserRepository) private omniUserRepository: OmniUserRepository) {}

  async findById(id: string): Promise<OmniUserDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.omniUserRepository.findOne(id, options);
    return OmniUserMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<OmniUserDTO>): Promise<OmniUserDTO | undefined> {
    const result = await this.omniUserRepository.findOne(options);
    return OmniUserMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<OmniUserDTO>): Promise<[OmniUserDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.omniUserRepository.findAndCount(options);
    const omniUserDTO: OmniUserDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(omniUser => omniUserDTO.push(OmniUserMapper.fromEntityToDTO(omniUser)));
      resultList[0] = omniUserDTO;
    }
    return resultList;
  }

  async save(omniUserDTO: OmniUserDTO): Promise<OmniUserDTO | undefined> {
    const entity = OmniUserMapper.fromDTOtoEntity(omniUserDTO);
    const result = await this.omniUserRepository.save(entity);
    return OmniUserMapper.fromEntityToDTO(result);
  }

  async update(omniUserDTO: OmniUserDTO): Promise<OmniUserDTO | undefined> {
    const entity = OmniUserMapper.fromDTOtoEntity(omniUserDTO);
    const result = await this.omniUserRepository.save(entity);
    return OmniUserMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.omniUserRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
