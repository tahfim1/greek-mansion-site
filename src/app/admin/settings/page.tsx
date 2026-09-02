import { PrismaClient } from '@prisma/client';

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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>Settings</h1>
          <p className="text-[#11102F]/60">Manage restaurant business info and configuration</p>
        </div>
        <button className="bg-[#B18C56] text-white px-4 py-2 rounded shadow">
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E8DCCB] p-6 max-w-3xl">
        <h2 className="text-xl font-bold text-[#1E1C59] mb-4">Business Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Restaurant Name</label>
            <input type="text" defaultValue={config['BUSINESS_NAME'] || 'Greek Mansion'} className="w-full form-input rounded border border-[#E8DCCB] p-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Phone Number</label>
            <input type="text" defaultValue={config['BUSINESS_PHONE'] || '(416) 292-3333'} className="w-full form-input rounded border border-[#E8DCCB] p-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Address</label>
            <input type="text" defaultValue={config['BUSINESS_ADDRESS'] || 'Toronto, ON'} className="w-full form-input rounded border border-[#E8DCCB] p-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E1C59] mb-1">Takeout Instructions</label>
            <textarea defaultValue={config['TAKEOUT_INSTRUCTIONS'] || 'Please pick up at the front counter.'} className="w-full form-input rounded border border-[#E8DCCB] p-2 h-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
