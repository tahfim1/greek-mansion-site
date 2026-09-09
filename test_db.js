const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const data = await prisma.cateringInquiry.findMany();
  console.log(data);
}
main().finally(() => prisma.$disconnect());
