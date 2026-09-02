'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// -- SETTINGS ACTIONS --

export async function saveSettings(data: Record<string, string>) {
  try {
    for (const [key, value] of Object.entries(data)) {
      await prisma.restaurantSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
    revalidatePath('/admin/settings');
    revalidatePath('/'); // revalidate homepage/layout
    return { success: true };
  } catch (error: any) {
    console.error('Failed to save settings:', error);
    return { success: false, error: error.message };
  }
}

// -- CATEGORY ACTIONS --

export async function createCategory(data: any) {
  try {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        image: data.image,
        displayOrder: data.displayOrder || 0,
        isHidden: data.isHidden || false,
      }
    });
    revalidatePath('/admin/menu/categories');
    revalidatePath('/menu');
    return { success: true, category };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCategory(id: string, data: any) {
  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        image: data.image,
        displayOrder: data.displayOrder,
        isHidden: data.isHidden,
      }
    });
    revalidatePath('/admin/menu/categories');
    revalidatePath('/menu');
    return { success: true, category };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath('/admin/menu/categories');
    revalidatePath('/menu');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// -- PRODUCT ACTIONS --

export async function createProduct(data: any) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        basePrice: parseInt(data.basePrice),
        categoryId: data.categoryId || null,
        isAvailable: data.isAvailable !== false,
        isSoldOut: data.isSoldOut || false,
        isFeatured: data.isFeatured || false,
        status: data.status || 'DRAFT',
        displayOrder: data.displayOrder || 0,
      }
    });

    if (data.image) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: data.image,
        }
      });
    }

    revalidatePath('/admin/menu/products');
    revalidatePath('/menu');
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        basePrice: parseInt(data.basePrice),
        categoryId: data.categoryId || null,
        isAvailable: data.isAvailable !== false,
        isSoldOut: data.isSoldOut || false,
        isFeatured: data.isFeatured || false,
        status: data.status || 'DRAFT',
        displayOrder: data.displayOrder || 0,
      }
    });

    if (data.image) {
      // Very basic approach: delete old images and add the new one
      await prisma.productImage.deleteMany({ where: { productId: id } });
      if (data.image !== '') {
        await prisma.productImage.create({
          data: {
            productId: id,
            url: data.image,
          }
        });
      }
    }

    revalidatePath('/admin/menu/products');
    revalidatePath('/menu');
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin/menu/products');
    revalidatePath('/menu');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
