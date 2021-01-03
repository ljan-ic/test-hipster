/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A OmniUser.
 */
@Entity('omni_user')
export class OmniUser extends BaseEntity {
  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'name', length: 30 })
  name: string;

  @Column({ name: 'surname', length: 30 })
  surname: string;

  @Column({ name: 'about', length: 500, nullable: true })
  about: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
