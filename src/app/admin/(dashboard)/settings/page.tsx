import { PrismaClient } from '@prisma/client';

import SettingsForm from './SettingsForm';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function SettingsAdmin() {
  const settings = await prisma.restaurantSetting.findMany();
  
  // Transform to a dictionary for easy access
  const config = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div>
      <SettingsForm initialConfig={config} />
    </div>
  );
}
