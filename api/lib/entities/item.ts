import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({name: 'items'})
export class Item {
  constructor(top: boolean, url: string, weather: string, idx: number) {
    this.top = top
    this.url = url
    this.weather = weather
    this.idx = idx
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  top: boolean

  @Column()
  url: string

  @Column()
  weather: string

  @Column()
  idx: number
}