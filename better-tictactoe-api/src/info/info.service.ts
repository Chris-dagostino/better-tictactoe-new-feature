import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateInfoRequest as UpdateInfoRequestInterface } from './interfaces';
import { BaseResponse } from '../interfaces';
import { UpdateInfoRequest } from './models';

function isValidDate(dateOfBirth: Date | null, age: number): boolean {
  if (!dateOfBirth || !(dateOfBirth instanceof Date)) {
    return false;
  }

  const currentYear = new Date().getFullYear();
  const birthYear = dateOfBirth.getFullYear();
  const calculatedAge = currentYear - birthYear;

  return calculatedAge === age;
}

@Injectable()
export class InfoService {
  async validateInfo(
    rawData: UpdateInfoRequestInterface,
  ): Promise<BaseResponse> {
    const data = plainToClass(UpdateInfoRequest, rawData);
    const validationErrors = await validate(data);

    if (data.age > 150) {
      return {
        success: false,
        errors: [{
          property: 'age',
          constraints: {
            max: 'L\'età deve essere inferiore o uguale a 150',
          },
        }],
      };
    }

    if (data.age < 18 && data.married) {
      return {
        success: false,
        errors: [{
          property: 'age',
          constraints: {
            custom: 'Se sei minorenne, non puoi essere segnalato come sposato.',
          },
        }, {
          property: 'married',
          constraints: {
            custom: 'Se sei minorenne, non puoi essere segnalato come sposato.',
          },
        }],
      };
    }

    const dateOfBirth = new Date(data.dateOfBirth);
    if (!isValidDate(dateOfBirth, data.age)) {
      return {
        success: false,
        errors: [{
          property: 'dateOfBirth',
          constraints: {
            custom: 'La data di nascita deve essere valida e coerente con l\'età.',
          },
        }],
      };
    }

    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors,
      };
    }

    return {
      success: true,
      data,
    };
  }
}
