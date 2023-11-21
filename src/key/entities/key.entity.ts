import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { BorrowedKey } from 'src/borrowedKey/entities/borroweKey.entity';

@Entity('keys')
export class Key {
  @PrimaryGeneratedColumn('uuid')
  keyId: string;

  @Column('text', {
    nullable: false,
    unique: true,
  })
  keyName: string;

  @Column('text', {
    nullable: false,
  })
  keyDescription: string;

  @Column('boolean', {
    default: false,
  })
  isBorrowed: boolean;

  @Column('text')
  deliveredBy: string;

  @Column('text')
  image: string;

  @ManyToOne(() => User, (user) => user.keys, {
    nullable: false,
  })
  user: User;

  @OneToMany(() => BorrowedKey, (borrowedKeys) => borrowedKeys.key)
  borrowedKeys: BorrowedKey[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt: Date;
}
