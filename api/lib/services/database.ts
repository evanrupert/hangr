import { Connection, createConnection, Repository } from 'typeorm'
import { TestTable } from '../entities/test_table'
import { Item } from '../entities/item'

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
      entities: [TestTable, Item]
    })

  }

  async itemsRepo(): Promise<Repository<Item>> {
    return this.conn.getRepository(Item)
  }

  async testTableRepo(): Promise<Repository<TestTable>> {
    return this.conn.getRepository(TestTable)
  }
}