
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Starting description seeding...");
  
  const products = await prisma.product.findMany();
  let updatedCount = 0;
  
  for (const product of products) {
    const shortDesc = product.shortDescription || '';
    const name = product.name;
    
    // Generate a slightly longer, appetizing description based on name and short description
    let fullDesc = `Experience the authentic taste of our ${name}.`;
    if (shortDesc) {
       fullDesc += ` ${shortDesc}.`;
    }
    fullDesc += ` Prepared fresh to order with the finest ingredients for the ultimate Greek Mansion experience.`;
    
    await prisma.product.update({
      where: { id: product.id },
      data: { fullDescription: fullDesc }
    });
    
    updatedCount++;
  }
  
  console.log(`Successfully updated ${updatedCount} products with full descriptions.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
