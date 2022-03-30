import { prisma } from '../src/lib/prisma'

const main = async () => {
  await prisma.market.createMany({
    data: [
      { title: 'sample market 1' },
      { title: 'sample market 2' },
      { title: 'sample market 3' },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
