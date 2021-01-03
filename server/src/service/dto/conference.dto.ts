/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A Conference DTO object.
 */
export class ConferenceDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ description: 'name field' })
  name: string;

  @ApiModelProperty({ description: 'thumbnail field' })
  thumbnail: any;

  thumbnailContentType: string;
  @IsNotEmpty()
  @ApiModelProperty({ description: 'startDateTime field' })
  startDateTime: any;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'expectedEndDateTime field' })
  expectedEndDateTime: any;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'description field' })
  description: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'price field' })
  price: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
