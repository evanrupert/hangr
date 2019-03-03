import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({name: 'carousel_queue'})
export class CarouselQueue {
  constructor(top: number, bottom: number) {
    this.top = top
    this.bottom = bottom
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  top: number

  @Column()
  bottom: number
}