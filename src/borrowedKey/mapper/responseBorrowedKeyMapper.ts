import { BorrowedKey } from '../entities/borroweKey.entity';

import { ResponseBorrowedKeyDto } from '../dto/response-borrowedKey.dto';
import { ResponseBorrwoedKeys } from '../dto';

export abstract class BorrowedKeyResponseMapper {
  public static toResponseBorrowedKeyDto(borrowedKey: BorrowedKey) {
    return ResponseBorrowedKeyDto.builder()
      .borrowedKeyId(borrowedKey.borrowedKeyId)
      .borrowerName(borrowedKey.borrowerName)
      .borrowerServiceOrCompany(borrowedKey.borrowerServiceOrCompany)
      .isOpened(borrowedKey.isOpened)
      .operator(borrowedKey.user.fullName)
      .keyName(borrowedKey.key.keyName)
      .createdAt(borrowedKey.createdAt)
      .updatedAt(borrowedKey.updatedAt)
      .build();
  }

  public static toResponseBorrowedKeysDto([borrowedKeys, count]: [
    BorrowedKey[],
    number,
  ]) {
    return ResponseBorrwoedKeys.builder()
      .borrowedKeys(
        borrowedKeys.map((borrowedKey) =>
          this.toResponseBorrowedKeyDto(borrowedKey),
        ),
      )
      .count(count)
      .build();
  }
}
