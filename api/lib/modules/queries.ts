import { Database } from '../services/database'

const maxCarouselIndex = 7

export async function findNextIndex(db: Database): Promise<number> {
  const itemsRepo = await db.itemsRepo()

  const items = await itemsRepo
    .createQueryBuilder()
    .orderBy("idx")
    .getMany()

  let lastUsed = -1
  for (let item of items) {
    if (item.idx != lastUsed + 1)
      return lastUsed + 1
    lastUsed = item.idx;
  }

  if (lastUsed < maxCarouselIndex)
    return lastUsed + 1

  throw new Error("Ran out of carousel indices")
}
