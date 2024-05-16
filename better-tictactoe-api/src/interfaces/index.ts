import { ValidationError } from 'class-validator';

interface BaseResponseInteface {
  success: boolean;
  data?: any;
  errors?: ValidationError[];
}

interface BaseResponseSuccess extends BaseResponseInteface {
  success: true;
  data: any;
}

interface BaseResponseError extends BaseResponseInteface {
  success: false;
  errors: ValidationError[];
}

export type BaseResponse = BaseResponseSuccess | BaseResponseError;