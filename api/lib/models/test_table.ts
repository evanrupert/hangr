import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TestTable {
  @PrimaryColumn()
  id: number

  @Column()
  name: string
}