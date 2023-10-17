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

@Entity('keys')
export class Key {
  @PrimaryGeneratedColumn('uuid')
  keyId: string;

  @Column('text', {
    nullable: false,
  })
  keyName: string;

  @Column('text', {
    nullable: false,
  })
  keyDescription: string;

  @Column('boolean', {
    default: false,
  })
  isLoaned: boolean;

  @Column('text')
  deliveredBy: string;

  @Column('text')
  image: string;

  @ManyToOne(() => User, (user) => user.keys, {
    nullable: false,
  })
  createBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt: Date;
}
