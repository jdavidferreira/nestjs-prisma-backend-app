import { PrismaClient } from '@prisma/client'
import { users } from './seeds/users'

const prisma = new PrismaClient()

async function main() {
  const usersCreated = await prisma.user.createMany({ data: users })

  console.log({ usersCreated })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
