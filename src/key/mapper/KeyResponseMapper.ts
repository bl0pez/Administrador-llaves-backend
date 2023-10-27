import { ResponseKeyDto } from '../dto/response-key.dto';
import { Key } from '../entities/key.entity';
import { ResponseKeysDto } from '../dto/response-keys.dto';

export abstract class KeyResponseMapper {
  public static toResponseKeyDto(key: Key) {
    return ResponseKeyDto.builder()
      .keyId(key.keyId)
      .keyName(key.keyName)
      .keyDescription(key.keyDescription)
      .image(key.image)
      .isBorrowed(key.isBorrowed)
      .deliveredBy(key.deliveredBy)
      .createBy(key.user.fullName)
      .createdAt(key.createdAt)
      .updatedAt(key.updatedAt)
      .deletedAt(key.deletedAt)
      .build();
  }

  public static toResponseKeysDto([keys, count]: [Key[], number]) {
    return ResponseKeysDto.builder()
      .keys(keys.map((key) => this.toResponseKeyDto(key)))
      .count(count)
      .build();
  }
}
