import { Builder } from 'builder-pattern';

export class ResponseBorrowedKeyDto {
  borrowedKeyId: string;
  borrowerName: string;
  borrowerServiceOrCompany: string;
  isOpened: boolean;
  operator: string;
  keyName: string;
  createdAt: Date;
  updatedAt: Date;
  receiverName: string | null;

  public static builder() {
    return Builder<ResponseBorrowedKeyDto>();
  }
}
