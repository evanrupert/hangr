import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({name: 'outfit_history'})
export class OutfitHistory {
    constructor(top: number, bottom: number, weather: string) {
        this.top = top
        this.bottom = bottom
        this.weather = weather
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    top: number

    @Column()
    bottom: number

    @Column()
    weather: string

    @Column()
    timestamp: Date
}
