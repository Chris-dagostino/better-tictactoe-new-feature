import { Controller, Post, Body } from '@nestjs/common';
import { InfoService } from './info.service';
import { UpdateInfoRequest as UpdateInfoRequestInterface } from './interfaces';
import { BaseResponse } from '../interfaces';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post('validate')
  async validateInfo(
    @Body() rawData: UpdateInfoRequestInterface,
  ): Promise<BaseResponse> {
    return this.infoService.validateInfo(rawData);
  }
}
