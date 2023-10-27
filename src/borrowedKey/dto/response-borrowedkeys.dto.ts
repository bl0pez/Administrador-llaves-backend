import { Builder } from 'builder-pattern';
import { ResponseBorrowedKeyDto } from './response-borrowedKey.dto';

export class ResponseBorrwoedKeys {
  count: number;
  borrowedKeys: ResponseBorrowedKeyDto[];

  public static builder() {
    return Builder<ResponseBorrwoedKeys>();
  }
}
