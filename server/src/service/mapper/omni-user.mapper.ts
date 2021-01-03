import { OmniUser } from '../../domain/omni-user.entity';
import { OmniUserDTO } from '../dto/omni-user.dto';

/**
 * A OmniUser mapper object.
 */
export class OmniUserMapper {
  static fromDTOtoEntity(entityDTO: OmniUserDTO): OmniUser {
    if (!entityDTO) {
      return;
    }
    let entity = new OmniUser();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: OmniUser): OmniUserDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new OmniUserDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
