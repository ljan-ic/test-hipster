import { Conference } from '../../domain/conference.entity';
import { ConferenceDTO } from '../dto/conference.dto';

/**
 * A Conference mapper object.
 */
export class ConferenceMapper {
  static fromDTOtoEntity(entityDTO: ConferenceDTO): Conference {
    if (!entityDTO) {
      return;
    }
    let entity = new Conference();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Conference): ConferenceDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new ConferenceDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
