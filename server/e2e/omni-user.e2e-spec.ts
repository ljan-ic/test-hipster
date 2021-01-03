import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { OmniUserDTO } from '../src/service/dto/omni-user.dto';
import { OmniUserService } from '../src/service/omni-user.service';

describe('OmniUser Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId'
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    deleteById: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(OmniUserService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all omni-users ', async () => {
    const getEntities: OmniUserDTO[] = (
      await request(app.getHttpServer())
        .get('/api/omni-users')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET omni-users by id', async () => {
    const getEntity: OmniUserDTO = (
      await request(app.getHttpServer())
        .get('/api/omni-users/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create omni-users', async () => {
    const createdEntity: OmniUserDTO = (
      await request(app.getHttpServer())
        .post('/api/omni-users')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update omni-users', async () => {
    const updatedEntity: OmniUserDTO = (
      await request(app.getHttpServer())
        .put('/api/omni-users')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE omni-users', async () => {
    const deletedEntity: OmniUserDTO = (
      await request(app.getHttpServer())
        .delete('/api/omni-users/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
