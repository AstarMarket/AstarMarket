import { prisma } from '../src/lib/prisma'

const main = async () => {
  await prisma.market.createMany({
    data: [
      { title: 'sample market 1', contract: '0x01' },
      { title: 'sample market 2', contract: '0x02' },
      { title: 'sample market 3', contract: '0x03' },
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
