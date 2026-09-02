export const BUSINESS = {
  name: 'Greek Mansion Restaurant',
  shortName: 'Greek Mansion',
  tagline: 'Authentic Greek Cuisine in Scarborough',
  services: ['Dine-in', 'Takeout', 'Catering'],
  address: {
    street: '5651 Steeles Ave E #10',
    city: 'Toronto',
    province: 'ON',
    postalCode: 'M1V 5P6',
    country: 'Canada',
    full: '5651 Steeles Ave E #10, Toronto, ON M1V 5P6, Canada',
    shortLocation: 'Steeles and Middlefield',
  },
  phone: '+1 416-292-3333',
  phoneRaw: '+14162923333',
  phoneTel: 'tel:+14162923333',
  website: 'https://greekmansion.ca/',
  email: 'TODO: Owner to provide email address',
  googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=5651+Steeles+Ave+E+%2310,+Toronto,+ON+M1V+5P6,+Canada',
  googleMapsEmbed: 'https://www.google.com/maps?q=5651+Steeles+Ave+E+%2310,+Toronto,+ON+M1V+5P6,+Canada&output=embed',
} as const;

export const BRAND = {
  indigo: '#1E1C59',
  gold: '#B18C56',
  white: '#FFFFFF',
  ivory: '#F7F3EA',
  sand: '#E8DCCB',
  ink: '#11102F',
  olive: '#73704A',
  indigoLight: '#2A2870',
  goldLight: '#C9A872',
  goldDark: '#8F7045',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Catering', href: '/catering' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const HOURS = {
  note: 'TODO: Owner to confirm opening hours',
  schedule: [] as { day: string; hours: string }[],
} as const;

export const SOCIAL = {
  note: 'TODO: Owner to provide official social media URLs',
  links: [] as { platform: string; url: string; icon: string }[],
} as const;
