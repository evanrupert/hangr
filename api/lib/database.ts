import { Connection, createConnection } from 'typeorm'
import { TestTable } from './models/test_table'

export class Database {
  public conn: Connection

  async initialize() {
    const dbPassword = process.env.HANGR_DB_PASSWORD

    this.conn = await createConnection({
      type: 'postgres',
      host: 'hangrdb.postgres.database.azure.com',
      port: 5432,
      username: 'hangradmin@hangrdb',
      password: dbPassword,
      database: 'postgres',
      entities: [TestTable]
    })
  }
}