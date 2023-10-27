import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Key } from 'src/key/entities/key.entity';

@Entity('BorrowedKeys')
export class BorrowedKey {
  @PrimaryGeneratedColumn('uuid')
  borrowedKeyId: string;

  @Column('text', {
    nullable: false,
  })
  borrowerName: string;

  @Column('text', {
    nullable: false,
  })
  borrowerServiceOrCompany: string;

  @Column('boolean', { default: true })
  isOpened: boolean;

  @ManyToOne(() => User, (user) => user.borrowedKeys)
  user: User;

  @ManyToOne(() => Key, (key) => key.borrowedKeys)
  key: Key;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt: Date;
}
