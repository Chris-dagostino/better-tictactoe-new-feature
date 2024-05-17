import { Controller, Post, Body } from '@nestjs/common';
import { InfoService } from './info.service';
import { UpdateInfoRequest } from './interfaces';
import { BaseResponse } from '../interfaces';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post('/validate')
  async validateInfo(@Body() bodyRequest: UpdateInfoRequest): Promise<BaseResponse> {
    return await this.infoService.validateInfo(bodyRequest);
  }
}
