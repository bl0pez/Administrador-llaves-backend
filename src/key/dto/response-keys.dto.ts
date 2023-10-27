import { Builder } from 'builder-pattern';
import { ResponseKeyDto } from './response-key.dto';

export class ResponseKeysDto {
  count: number;
  keys: ResponseKeyDto[];

  public static builder() {
    return Builder<ResponseKeysDto>();
  }
}
