import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { OmniUserDTO } from '../../service/dto/omni-user.dto';
import { OmniUserService } from '../../service/omni-user.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/omni-users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('omni-users')
export class OmniUserController {
  logger = new Logger('OmniUserController');

  constructor(private readonly omniUserService: OmniUserService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: OmniUserDTO
  })
  async getAll(@Req() req: Request): Promise<OmniUserDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.omniUserService.findAndCount({
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
    type: OmniUserDTO
  })
  async getOne(@Param('id') id: string): Promise<OmniUserDTO> {
    return await this.omniUserService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create omniUser' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: OmniUserDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() omniUserDTO: OmniUserDTO): Promise<OmniUserDTO> {
    const created = await this.omniUserService.save(omniUserDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'OmniUser', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update omniUser' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: OmniUserDTO
  })
  async put(@Req() req: Request, @Body() omniUserDTO: OmniUserDTO): Promise<OmniUserDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'OmniUser', omniUserDTO.id);
    return await this.omniUserService.update(omniUserDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete omniUser' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'OmniUser', id);
    return await this.omniUserService.deleteById(id);
  }
}
