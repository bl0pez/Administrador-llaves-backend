import { User } from 'src/auth/entities/user.entity';
import { Key } from 'src/key/entities/key.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('loanRecords')
export class LoanRecord {
  @PrimaryGeneratedColumn('uuid')
  loanRecordId: string;

  @Column('text', {
    nullable: false,
  })
  borrowerName: string;

  @Column('text', {
    nullable: false,
  })
  borrowerServiceOrCompany: string;

  @ManyToOne(() => User, (user) => user.loanRecords)
  user: User;

  @ManyToOne(() => Key, (key) => key.loanRecords)
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
