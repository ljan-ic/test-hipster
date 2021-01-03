import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { ConferenceDTO } from '../../service/dto/conference.dto';
import { ConferenceService } from '../../service/conference.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/conferences')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('conferences')
export class ConferenceController {
  logger = new Logger('ConferenceController');

  constructor(private readonly conferenceService: ConferenceService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ConferenceDTO
  })
  async getAll(@Req() req: Request): Promise<ConferenceDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.conferenceService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ConferenceDTO
  })
  async getOne(@Param('id') id: string): Promise<ConferenceDTO> {
    return await this.conferenceService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create conference' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ConferenceDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() conferenceDTO: ConferenceDTO): Promise<ConferenceDTO> {
    const created = await this.conferenceService.save(conferenceDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Conference', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update conference' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ConferenceDTO
  })
  async put(@Req() req: Request, @Body() conferenceDTO: ConferenceDTO): Promise<ConferenceDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Conference', conferenceDTO.id);
    return await this.conferenceService.update(conferenceDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete conference' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Conference', id);
    return await this.conferenceService.deleteById(id);
  }
}
