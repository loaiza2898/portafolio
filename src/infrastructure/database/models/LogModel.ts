import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Log_Model {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  transactionId!: string;

  @Column({ type: "varchar" })
  action!: string;

  @Column({ type: "datetime" })
  timestamp!: Date;
}