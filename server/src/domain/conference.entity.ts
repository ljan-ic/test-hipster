/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Conference.
 */
@Entity('conference')
export class Conference extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ type: 'blob', name: 'thumbnail' })
  thumbnail: any;

  @Column({ name: 'thumbnail_content_type' })
  thumbnailContentType: string;

  @Column({ type: 'datetime', name: 'start_date_time' })
  startDateTime: any;

  @Column({ type: 'datetime', name: 'expected_end_date_time' })
  expectedEndDateTime: any;

  @Column({ name: 'description' })
  description: string;

  @Column({ type: 'decimal', name: 'price', precision: 10, scale: 2 })
  price: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
