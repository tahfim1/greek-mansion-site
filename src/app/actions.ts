'use server';

import prisma from '@/lib/prisma';

export async function getPublicSettings() {
  try {
    const settings = await prisma.restaurantSetting.findMany();
    const config = settings.reduce((acc: Record<string, string>, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    return config;
  } catch (error) {
    console.error('Failed to fetch public settings:', error);
    return {};
  }
}
