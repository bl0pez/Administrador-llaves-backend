import { Builder } from 'builder-pattern';

export class ResponseKeyDto {
  createBy: string;
  createdAt: Date;
  deletedAt: Date | null;
  deliveredBy: string;
  image: string;
  isBorrowed: boolean;
  keyDescription: string;
  keyId: string;
  keyName: string;
  updatedAt: Date;

  public static builder() {
    return Builder<ResponseKeyDto>();
  }
}
