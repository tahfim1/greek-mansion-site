const { PrismaClient } = require('@prisma/client');
const { MENU_CATEGORIES } = require('./src/data/menu.ts');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with old static data...');
  
  for (let i = 0; i < MENU_CATEGORIES.length; i++) {
    const cat = MENU_CATEGORIES[i];
    
    // Create category
    const createdCat = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.id,
        description: cat.description,
        displayOrder: i,
        isHidden: false,
        isArchived: false,
      }
    });
    
    // Create products
    for (let j = 0; j < cat.products.length; j++) {
      const prod = cat.products[j];
      
      let variantsJson = null;
      if (prod.variants && prod.variants.length > 0) {
         variantsJson = JSON.stringify(prod.variants);
      }
      
      const createdProd = await prisma.product.create({
        data: {
          name: prod.name,
          slug: prod.id,
          shortDescription: prod.description,
          fullDescription: prod.description,
          basePrice: prod.price,
          categoryId: createdCat.id,
          isAvailable: true,
          isSoldOut: false,
          status: 'PUBLISHED',
          displayOrder: j,
          menuInfoGroups: variantsJson,
        }
      });
      
      if (prod.image) {
        await prisma.productImage.create({
          data: {
            productId: createdProd.id,
            url: prod.image,
          }
        });
      }
    }
  }
  
  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
