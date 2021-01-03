/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A OmniUser DTO object.
 */
export class OmniUserDTO extends BaseDTO {
  @IsNotEmpty()
  @Matches('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+')
  @ApiModelProperty({ description: 'email field' })
  email: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'password field' })
  password: string;

  @IsNotEmpty()
  @MaxLength(30)
  @ApiModelProperty({ description: 'name field' })
  name: string;

  @IsNotEmpty()
  @MaxLength(30)
  @ApiModelProperty({ description: 'surname field' })
  surname: string;

  @MaxLength(500)
  @ApiModelProperty({ description: 'about field', required: false })
  about: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
