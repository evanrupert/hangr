import { Connection, createConnection, Repository } from 'typeorm'
import { TestTable } from '../entities/test_table'
import { Item } from '../entities/item'
import { CarouselQueue } from '../entities/carousel_queue'
import { OutfitHistory } from '../entities/outfit_history';

export class Database {
  private conn: Connection

  async initialize() {
    const dbPassword = process.env.HANGR_DB_PASSWORD

    this.conn = await createConnection({
      type: 'postgres',
      host: 'hangrdb.postgres.database.azure.com',
      port: 5432,
      username: 'hangradmin@hangrdb',
      password: dbPassword,
      database: 'postgres',
      entities: [TestTable, Item, CarouselQueue, OutfitHistory]
    })
  }

  async close() {
    await this.conn.close()
  }

  async itemsRepo(): Promise<Repository<Item>> {
    return this.conn.getRepository(Item)
  }

  async carouselQueueRepo(): Promise<Repository<CarouselQueue>> {
    return this.conn.getRepository(CarouselQueue)
  }

  async outfitHistoryRepo(): Promise<Repository<OutfitHistory>> {
    return this.conn.getRepository(OutfitHistory)
  }
}
