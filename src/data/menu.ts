/* ======================================================================
   Greek Mansion Restaurant — Authoritative Menu Data
   Source: Greek Menu.pdf (May 2025 creation date)
   
   IMPORTANT: This is import/seed data extracted from the supplied PDF.
   In production, PostgreSQL becomes the live catalog.
   Prices are imported as-is from the PDF and should be reviewed by the
   owner before enabling production ordering.
   ====================================================================== */

export interface ModifierOption {
  name: string;
  priceDelta: number; // in cents
  default?: boolean;
  soldOut?: boolean;
}

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  minSelections: number;
  maxSelections: number;
  options: ModifierOption[];
}

export interface ProductVariant {
  label: string;
  price: number; // in cents
  default?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image?: string;
  price: number; // base price in cents (smallest variant)
  variants?: ProductVariant[];
  modifierGroups?: string[]; // references to shared modifier group IDs
  featured?: boolean;
  cateringOnly?: boolean;
  status: 'active' | 'draft' | 'sold_out';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  products: Product[];
  sortOrder: number;
}

/* ── Shared Modifier Groups ──────────────────────────────── */

export const MODIFIER_GROUPS: ModifierGroup[] = [
  {
    id: 'plate-sides',
    name: 'Choice of Sides',
    required: true,
    minSelections: 2,
    maxSelections: 2,
    options: [
      { name: 'Rice', priceDelta: 0 },
      { name: 'Potatoes', priceDelta: 0 },
      { name: 'Fries', priceDelta: 0 },
      { name: 'Onion Rings', priceDelta: 0 },
      { name: 'Veggies', priceDelta: 0 },
      { name: 'Greek Salad', priceDelta: 150 },
    ],
  },
  {
    id: 'wrap-combo-side',
    name: 'Combo Side',
    required: true,
    minSelections: 1,
    maxSelections: 1,
    options: [
      { name: 'Rice', priceDelta: 0 },
      { name: 'Potatoes', priceDelta: 0 },
      { name: 'Fries', priceDelta: 0 },
      { name: 'Onion Rings', priceDelta: 0 },
      { name: 'Greek Salad', priceDelta: 150 },
      { name: 'Veggies', priceDelta: 200 },
    ],
  },
  {
    id: 'sandwich-combo-side',
    name: 'Combo Side',
    required: true,
    minSelections: 1,
    maxSelections: 1,
    options: [
      { name: 'Rice', priceDelta: 0 },
      { name: 'Potatoes', priceDelta: 0 },
      { name: 'Fries', priceDelta: 0 },
      { name: 'Onion Rings', priceDelta: 0 },
      { name: 'Greek Salad', priceDelta: 150 },
      { name: 'Veggies', priceDelta: 200 },
    ],
  },
  {
    id: 'spicy-tzatziki-sub',
    name: 'Tzatziki Option',
    required: false,
    minSelections: 0,
    maxSelections: 1,
    options: [
      { name: 'Sub Spicy Tzatziki', priceDelta: 100 },
    ],
  },
  {
    id: 'salad-protein-add',
    name: 'Add Protein',
    required: false,
    minSelections: 0,
    maxSelections: 1,
    options: [
      { name: 'Chicken Souvlaki', priceDelta: 375 },
      { name: 'Pork Souvlaki', priceDelta: 375 },
      { name: 'Chicken Fillet', priceDelta: 375 },
      { name: 'Gyro', priceDelta: 500 },
      { name: 'Falafel (4pc)', priceDelta: 350 },
      { name: 'Crab Cakes (2pcs)', priceDelta: 850 },
    ],
  },
  {
    id: 'lunch-box-protein',
    name: 'Choice of Protein',
    required: true,
    minSelections: 1,
    maxSelections: 1,
    options: [
      { name: 'Chicken', priceDelta: 0 },
      { name: 'Pork', priceDelta: 0 },
      { name: 'Gyro', priceDelta: 0 },
    ],
  },
  {
    id: 'family-souvlaki-choice',
    name: 'Souvlaki Choice',
    required: true,
    minSelections: 1,
    maxSelections: 1,
    options: [
      { name: 'Chicken Souvlaki', priceDelta: 0 },
      { name: 'Pork Souvlaki', priceDelta: 0 },
      { name: 'Large Gyro', priceDelta: 0 },
    ],
  },
  {
    id: 'pita-platter-protein',
    name: 'Wrap Protein',
    required: true,
    minSelections: 1,
    maxSelections: 1,
    options: [
      { name: 'Chicken', priceDelta: 0 },
      { name: 'Pork', priceDelta: 0 },
      { name: 'Falafel', priceDelta: 0 },
      { name: 'Gyro', priceDelta: 100 },
    ],
  },
  {
    id: 'kids-drink',
    name: 'Drink',
    required: false,
    minSelections: 0,
    maxSelections: 1,
    options: [
      { name: 'Included Can of Pop', priceDelta: 0, default: true },
    ],
  },
];

/* ── Menu Categories & Products ──────────────────────────── */

export const MENU_CATEGORIES: Category[] = [
  /* ──────────── APPETIZERS ──────────── */
  {
    id: 'appetizers',
    name: 'Appetizers',
    slug: 'appetizers',
    description: 'Start your meal with our signature Greek starters',
    image: '/images/food/grilled-calamari.jpg',
    sortOrder: 1,
    products: [
      {
        id: 'greek-fries',
        name: 'Greek Fries or Onion Rings',
        description: 'Crispy fries or onion rings with Greek seasoning and feta',
        image: '/images/food/greek-fries.jpg',
        price: 995,
        status: 'active',
        featured: true,
      },
      {
        id: 'gyro-poutine',
        name: 'Gyro Poutine',
        description: 'Fries or onion rings topped with gyro meat, cheese, and gravy',
        image: '/images/food/gyro-poutine.jpg',
        price: 1195,
        variants: [
          { label: 'Fries', price: 1195, default: true },
          { label: 'Onion Rings', price: 1195 },
        ],
        status: 'active',
      },
      {
        id: 'chicken-wings',
        name: 'Chicken Wings',
        description: '1 LB of crispy chicken wings',
        image: '/images/food/chicken-wings.jpg',
        price: 1195,
        status: 'active',
        featured: true,
      },
      {
        id: 'saganaki',
        name: 'Saganaki',
        description: 'Pan-fried Greek cheese',
        image: '/images/food/saganaki-gen.jpg',
        price: 1195,
        status: 'active',
      },
      {
        id: 'grilled-calamari-app',
        name: 'Grilled Calamari',
        description: 'Freshly marinated calamari grilled with green peppers and onions',
        image: '/images/food/grilled-calamari.jpg',
        price: 1295,
        status: 'active',
        featured: true,
      },
      {
        id: 'fried-calamari-app',
        name: 'Fried Calamari',
        description: 'Lightly breaded fresh calamari fried to perfection',
        image: '/images/food/calamari-hq.jpg',
        price: 1295,
        status: 'active',
      },
      {
        id: 'spanakopita-app',
        name: 'Spanakopita',
        description: 'Spinach and cheese pastry baked and toasted',
        image: '/images/food/spanakopita.jpg',
        price: 750,
        status: 'active',
      },
      {
        id: 'tzatziki-pita',
        name: 'Tzatziki & Pita',
        description: 'Creamy tzatziki dip served with warm pita bread',
        image: '/images/food/tzatziki-pita.jpg',
        price: 595,
        status: 'active',
      },
      {
        id: 'falafel-4pc',
        name: 'Falafel (4pc)',
        description: 'Four pieces of crispy falafel',
        image: '/images/food/falafel-gen.jpg',
        price: 550,
        status: 'active',
      },
      {
        id: 'pork-stick',
        name: 'Pork Stick',
        description: 'Seasoned pork souvlaki skewer',
        image: '',
        price: 375,
        status: 'active',
      },
      {
        id: 'chicken-stick',
        name: 'Chicken Stick',
        description: 'Seasoned chicken souvlaki skewer',
        image: '',
        price: 375,
        status: 'active',
      },
      {
        id: 'garlic-bread',
        name: 'Garlic Bread',
        description: 'Toasted bread with garlic butter',
        image: '/images/food/garlic-bread-gen.jpg',
        price: 395,
        status: 'active',
      },
      {
        id: 'pita-bread',
        name: 'Pita',
        description: 'Warm, soft pita bread',
        image: '/images/food/pita-gen.jpg',
        price: 195,
        status: 'active',
      },
    ],
  },

  /* ──────────── MANSION EXTRAS & SIDES ──────────── */
  {
    id: 'mansion-extras',
    name: 'Mansion Extras',
    slug: 'mansion-extras',
    description: 'Sides and extras — available in small, medium, and large',
    image: '/images/food/spicy-tzatziki.jpg',
    sortOrder: 2,
    products: [
      {
        id: 'spicy-tzatziki',
        name: 'Spicy Tzatziki',
        description: 'Our signature spicy tzatziki — Side: $2.00',
        image: '/images/food/spicy-tzatziki.jpg',
        price: 425,
        variants: [
          { label: 'Small', price: 425 },
          { label: 'Medium', price: 850 },
          { label: 'Large', price: 1150 },
        ],
        status: 'active',
      },
      {
        id: 'tzatziki-side',
        name: 'Tzatziki',
        description: 'Creamy yogurt and cucumber dip',
        image: '/images/food/tzatziki-gen.jpg',
        price: 195,
        variants: [
          { label: 'Small', price: 325 },
          { label: 'Medium', price: 650 },
          { label: 'Large', price: 995 },
        ],
        status: 'active',
      },
      {
        id: 'beef-gravy',
        name: 'Beef Gravy',
        description: 'Rich, savory brown gravy',
        image: '/images/food/beef-gravy-gen.jpg',
        price: 195,
        variants: [
          { label: 'Small', price: 295 },
          { label: 'Medium', price: 595 },
          { label: 'Large', price: 795 },
        ],
        status: 'active',
      },
      {
        id: 'veggies-side',
        name: 'Veggies',
        description: 'Steamed vegetables',
        image: '/images/food/veggies-gen.jpg',
        price: 795,
        variants: [
          { label: 'Small', price: 795 },
          { label: 'Medium', price: 1195 },
          { label: 'Large', price: 1495 },
        ],
        status: 'active',
      },
      {
        id: 'potato-side',
        name: 'Potatoes',
        description: 'Greek-style potatoes',
        image: '/images/food/potatoes-gen.jpg',
        price: 500,
        variants: [
          { label: 'Small', price: 500 },
          { label: 'Medium', price: 850 },
          { label: 'Large', price: 1050 },
        ],
        status: 'active',
      },
      {
        id: 'rice-side',
        name: 'Rice',
        description: 'Seasoned rice',
        image: '/images/food/rice-gen.jpg',
        price: 500,
        variants: [
          { label: 'Small', price: 500 },
          { label: 'Medium', price: 850 },
          { label: 'Large', price: 1050 },
        ],
        status: 'active',
      },
      {
        id: 'gyros-meat-only',
        name: 'Gyros (Meat Only)',
        description: 'Seasoned beef and lamb mix from the vertical rotisserie',
        image: '',
        price: 995,
        variants: [
          { label: 'Small', price: 995 },
          { label: 'Medium', price: 1995 },
          { label: 'Large', price: 2995 },
        ],
        status: 'active',
      },
      {
        id: 'french-fries-side',
        name: 'French Fries',
        description: 'Classic french fries',
        image: '',
        price: 495,
        variants: [
          { label: 'Small', price: 495 },
          { label: 'Medium', price: 695 },
          { label: 'Large', price: 895 },
        ],
        status: 'active',
      },
      {
        id: 'onion-rings-side',
        name: 'Onion Rings',
        description: 'Crispy battered onion rings',
        image: '/images/food/onion-rings-gen.jpg',
        price: 595,
        variants: [
          { label: 'Small', price: 595 },
          { label: 'Medium', price: 895 },
          { label: 'Large', price: 1195 },
        ],
        status: 'active',
      },
    ],
  },

  /* ──────────── MANSION PITA WRAPS ──────────── */
  {
    id: 'pita-wraps',
    name: 'Mansion Pita Wraps',
    slug: 'pita-wraps',
    description: 'All wraps served with lettuce, onions, tomato and tzatziki. Sub spicy tzatziki $1.00. Combo includes one side and a regular can of pop.',
    image: '/images/food/gyro-wrap.jpg',
    sortOrder: 3,
    products: [
      {
        id: 'veggie-wrap',
        name: 'Veggie Wrap',
        description: 'Fresh vegetables wrapped in warm pita with tzatziki',
        image: '/images/food/veggie-wrap.jpg',
        price: 595,
        variants: [
          { label: 'Wrap Only', price: 595, default: true },
          { label: 'Combo', price: 1195 },
        ],
        modifierGroups: ['spicy-tzatziki-sub', 'wrap-combo-side'],
        status: 'active',
      },
      {
        id: 'falafel-wrap',
        name: 'Falafel Wrap',
        description: 'Crispy chickpea falafel wrapped in warm pita with tzatziki',
        image: '/images/food/falafel-wrap.jpg',
        price: 695,
        variants: [
          { label: 'Wrap Only', price: 695, default: true },
          { label: 'Combo', price: 1295 },
        ],
        modifierGroups: ['spicy-tzatziki-sub', 'wrap-combo-side'],
        status: 'active',
      },
      {
        id: 'gyro-wrap',
        name: 'Gyro Wrap',
        description: 'Lamb and beef mixed meat wrapped in warm pita with tzatziki',
        image: '/images/food/gyro-wrap.jpg',
        price: 850,
        variants: [
          { label: 'Wrap Only', price: 850, default: true },
          { label: 'Combo', price: 1495 },
        ],
        modifierGroups: ['spicy-tzatziki-sub', 'wrap-combo-side'],
        status: 'active',
        featured: true,
      },
      {
        id: 'chicken-fillet-wrap',
        name: 'Chicken Fillet Wrap',
        description: 'Grilled chicken fillet wrapped in warm pita with tzatziki',
        image: '/images/food/chicken-fillet-wrap.jpg',
        price: 795,
        variants: [
          { label: 'Wrap Only', price: 795, default: true },
          { label: 'Combo', price: 1350 },
        ],
        modifierGroups: ['spicy-tzatziki-sub', 'wrap-combo-side'],
        status: 'active',
      },
      {
        id: 'pork-souvlaki-wrap-1',
        name: 'Pork Souvlaki Wrap (1 Stick)',
        description: 'Pork souvlaki skewer wrapped in warm pita with tzatziki',
        image: '/images/food/pork-wrap.jpg',
        price: 750,
        variants: [
          { label: 'Wrap Only', price: 750, default: true },
          { label: 'Combo', price: 1350 },
        ],
        modifierGroups: ['spicy-tzatziki-sub', 'wrap-combo-side'],
        status: 'active',
      },
      {
        id: 'pork-souvlaki-wrap-2',
        name: 'Pork Souvlaki Wrap (2 Sticks)',
        description: 'Two pork souvlaki skewers wrapped in warm pita with tzatziki',
        image: '/images/food/pork-wrap.jpg',
        price: 995,
        variants: [
          { label: 'Wrap Only', price: 995, default: true },
          { label: 'Combo', price: 1495 },
        ],
        modifierGroups: ['spicy-tzatziki-sub', 'wrap-combo-side'],
        status: 'active',
      },
      {
        id: 'chicken-souvlaki-wrap-1',
        name: 'Chicken Souvlaki Wrap (1 Stick)',
        description: 'Chicken souvlaki skewer wrapped in warm pita with tzatziki',
        image: '/images/food/chicken-wrap.jpg',
        price: 750,
        variants: [
          { label: 'Wrap Only', price: 750, default: true },
          { label: 'Combo', price: 1350 },
        ],
        modifierGroups: ['spicy-tzatziki-sub', 'wrap-combo-side'],
        status: 'active',
      },
      {
        id: 'chicken-souvlaki-wrap-2',
        name: 'Chicken Souvlaki Wrap (2 Sticks)',
        description: 'Two chicken souvlaki skewers wrapped in warm pita with tzatziki',
        image: '/images/food/chicken-wrap.jpg',
        price: 950,
        variants: [
          { label: 'Wrap Only', price: 950, default: true },
          { label: 'Combo', price: 1495 },
        ],
        modifierGroups: ['spicy-tzatziki-sub', 'wrap-combo-side'],
        status: 'active',
      },
    ],
  },

  /* ──────────── DINNER PLATES ──────────── */
  {
    id: 'dinner-plates',
    name: 'Dinner Plates',
    slug: 'dinner-plates',
    description: 'All plates come with Greek salad and your choice of two sides: rice, potatoes, veggies, fries, or onion rings.',
    image: '/images/food/gyro-plate.jpg',
    sortOrder: 4,
    products: [
      {
        id: 'plain-plate',
        name: 'Plain Plate',
        description: 'Your choice of two sides, Greek salad, tzatziki sauce and pita bread',
        image: '',
        price: 1095,
        variants: [
          { label: 'Regular', price: 1095, default: true },
          { label: 'Large', price: 1495 },
        ],
        modifierGroups: ['plate-sides'],
        status: 'active',
      },
      {
        id: 'gyro-plate',
        name: 'Gyro Plate',
        description: 'Seasoned beef and lamb mix, cooked on a vertical rotisserie, served with your choice of two sides, Greek salad, tzatziki sauce and pita bread',
        image: '/images/food/gyro-plate.jpg',
        price: 1450,
        variants: [
          { label: 'Regular', price: 1450, default: true },
          { label: 'Large', price: 1895 },
        ],
        modifierGroups: ['plate-sides'],
        status: 'active',
        featured: true,
      },
      {
        id: 'chicken-plate',
        name: 'Chicken Plate',
        description: 'Chicken, skewered and seasoned with Greek spices, cooked over an open flame, served with your choice of two sides, Greek salad, tzatziki sauce and pita bread',
        image: '/images/food/chicken-dinner.jpg',
        price: 1450,
        variants: [
          { label: 'Regular', price: 1450, default: true },
          { label: 'Large', price: 1895 },
        ],
        modifierGroups: ['plate-sides'],
        status: 'active',
        featured: true,
      },
      {
        id: 'pork-plate',
        name: 'Pork Plate',
        description: 'Pork, skewered and seasoned with Greek spices, cooked over an open flame, served with your choice of two sides, Greek salad, tzatziki sauce and pita bread',
        image: '/images/food/pork-plate.jpg',
        price: 1450,
        variants: [
          { label: 'Regular', price: 1450, default: true },
          { label: 'Large', price: 1895 },
        ],
        modifierGroups: ['plate-sides'],
        status: 'active',
      },
      {
        id: 'lamb-plate',
        name: 'Lamb Plate',
        description: 'Lamb, skewered and seasoned with Greek spices, cooked over an open flame, served with your choice of two sides, Greek salad, tzatziki sauce and pita bread',
        image: '/images/food/lamb-plate.jpg',
        price: 2195,
        variants: [
          { label: 'Regular', price: 2195, default: true },
          { label: 'Large', price: 2695 },
        ],
        modifierGroups: ['plate-sides'],
        status: 'active',
      },
      {
        id: 'steak-plate',
        name: 'Steak Plate',
        description: '6oz steak seasoned with our special seasoning cooked over an open flame, served with your choice of two sides, Greek salad, tzatziki sauce and pita bread',
        image: '/images/food/steak-dinner.jpg',
        price: 1995,
        variants: [
          { label: 'Regular', price: 1995, default: true },
          { label: 'Large', price: 2495 },
        ],
        modifierGroups: ['plate-sides'],
        status: 'active',
      },
      {
        id: 'falafel-plate',
        name: 'Falafel Plate',
        description: 'Falafels, served with your choice of two sides, Greek salad, tzatziki sauce and pita bread',
        image: '/images/food/falafel-plate.jpg',
        price: 1195,
        variants: [
          { label: 'Regular', price: 1195, default: true },
          { label: 'Large', price: 1695 },
        ],
        modifierGroups: ['plate-sides'],
        status: 'active',
      },
      {
        id: 'veggie-plate',
        name: 'Veggie Plate',
        description: 'Steamed veggies with your choice of two sides, Greek salad, tzatziki sauce and pita bread',
        image: '',
        price: 1450,
        variants: [
          { label: 'Regular', price: 1450, default: true },
          { label: 'Large', price: 1895 },
        ],
        modifierGroups: ['plate-sides'],
        status: 'active',
      },
    ],
  },

  /* ──────────── SANDWICHES ON A BUN ──────────── */
  {
    id: 'sandwiches',
    name: 'Sandwiches on a Bun',
    slug: 'sandwiches',
    description: 'All sandwiches served with lettuce, onions, tomato and tzatziki. Combo includes one side and a regular can of pop.',
    image: '/images/food/gyro-sandwich.jpg',
    sortOrder: 5,
    products: [
      {
        id: 'burger',
        name: 'Burger',
        description: '6oz beef burger topped to your liking',
        image: '/images/food/beef-burger.jpg',
        price: 795,
        variants: [
          { label: 'Sandwich', price: 795, default: true },
          { label: 'Combo', price: 1195 },
        ],
        modifierGroups: ['sandwich-combo-side'],
        status: 'active',
      },
      {
        id: 'chicken-burger',
        name: 'Chicken Burger',
        description: 'Grilled chicken breast topped to your liking',
        image: '/images/food/chicken-burger.jpg',
        price: 895,
        variants: [
          { label: 'Sandwich', price: 895, default: true },
          { label: 'Combo', price: 1295 },
        ],
        modifierGroups: ['sandwich-combo-side'],
        status: 'active',
      },
      {
        id: 'chicken-souvlaki-sandwich',
        name: 'Chicken Souvlaki Sandwich',
        description: 'Chicken souvlaki on a bun with lettuce, onion, tomatoes and tzatziki',
        image: '/images/food/chicken-sandwich.jpg',
        price: 995,
        variants: [
          { label: 'Sandwich', price: 995, default: true },
          { label: 'Combo', price: 1495 },
        ],
        modifierGroups: ['sandwich-combo-side'],
        status: 'active',
      },
      {
        id: 'pork-souvlaki-sandwich',
        name: 'Pork Souvlaki Sandwich',
        description: 'Pork souvlaki on a bun with lettuce, onion, tomatoes and tzatziki',
        image: '/images/food/pork-sandwich.jpg',
        price: 995,
        variants: [
          { label: 'Sandwich', price: 995, default: true },
          { label: 'Combo', price: 1495 },
        ],
        modifierGroups: ['sandwich-combo-side'],
        status: 'active',
      },
      {
        id: 'gyro-sandwich',
        name: 'Gyro Sandwich',
        description: 'Gyro on a bun with lettuce, onion, tomato and tzatziki',
        image: '/images/food/gyro-sandwich.jpg',
        price: 995,
        variants: [
          { label: 'Sandwich', price: 995, default: true },
          { label: 'Combo', price: 1495 },
        ],
        modifierGroups: ['sandwich-combo-side'],
        status: 'active',
      },
      {
        id: 'steak-sandwich',
        name: 'Steak Sandwich',
        description: '6oz steak on a bun with lettuce, onion, tomato and tzatziki',
        image: '',
        price: 1395,
        variants: [
          { label: 'Sandwich', price: 1395, default: true },
          { label: 'Combo', price: 1850 },
        ],
        modifierGroups: ['sandwich-combo-side'],
        status: 'active',
      },
      {
        id: 'fish-sandwich',
        name: 'Fish Sandwich',
        description: 'Haddock on a bun with lettuce, onion, tomato and tartar sauce',
        image: '',
        price: 995,
        variants: [
          { label: 'Sandwich', price: 995, default: true },
          { label: 'Combo', price: 1495 },
        ],
        modifierGroups: ['sandwich-combo-side'],
        status: 'active',
      },
      {
        id: 'philly-steak',
        name: 'Philly Steak',
        description: 'Green peppers, onions, mushrooms, cheddar cheese and tzatziki',
        image: '/images/food/philly-steak.jpg',
        price: 995,
        variants: [
          { label: 'Sandwich', price: 995, default: true },
          { label: 'Combo', price: 1495 },
        ],
        modifierGroups: ['sandwich-combo-side'],
        status: 'active',
      },
      {
        id: 'philly-chicken',
        name: 'Philly Chicken',
        description: 'Green peppers, onions, mushrooms, cheddar cheese and tzatziki',
        image: '/images/food/philly-chicken.jpg',
        price: 995,
        variants: [
          { label: 'Sandwich', price: 995, default: true },
          { label: 'Combo', price: 1495 },
        ],
        modifierGroups: ['sandwich-combo-side'],
        status: 'active',
      },
      {
        id: 'philly-veggie',
        name: 'Philly Veggie',
        description: 'Broccoli, cauliflower, green peppers, onions, mushrooms, cheddar cheese and tzatziki',
        image: '/images/food/philly-veggie.jpg',
        price: 995,
        variants: [
          { label: 'Sandwich', price: 995, default: true },
          { label: 'Combo', price: 1495 },
        ],
        modifierGroups: ['sandwich-combo-side'],
        status: 'active',
      },
    ],
  },

  /* ──────────── SALADS ──────────── */
  {
    id: 'salads',
    name: 'Salads',
    slug: 'salads',
    description: 'Fresh salads in small, medium, and large. Add your protein for extra flavour. Chicken salads are made with chicken fillet — for souvlaki, please let us know when ordering.',
    image: '/images/food/greek-salad.jpg',
    sortOrder: 6,
    products: [
      {
        id: 'greek-salad',
        name: 'Greek Salad',
        description: 'Classic Greek salad with feta, olives, tomatoes, cucumber, and onion',
        image: '/images/food/greek-salad.jpg',
        price: 695,
        variants: [
          { label: 'Small', price: 695 },
          { label: 'Medium', price: 850 },
          { label: 'Large', price: 1295 },
        ],
        modifierGroups: ['salad-protein-add'],
        status: 'active',
        featured: true,
      },
      {
        id: 'caesar-salad',
        name: 'Caesar Salad',
        description: 'Romaine lettuce, parmesan, croutons, and Caesar dressing',
        image: '/images/food/caesar-salad.jpg',
        price: 795,
        variants: [
          { label: 'Small', price: 795 },
          { label: 'Medium', price: 950 },
          { label: 'Large', price: 1295 },
        ],
        modifierGroups: ['salad-protein-add'],
        status: 'active',
      },
      {
        id: 'country-salad',
        name: 'Country Salad',
        description: 'Fresh country-style salad',
        image: '',
        price: 895,
        variants: [
          { label: 'Small', price: 895 },
          { label: 'Medium', price: 1050 },
          { label: 'Large', price: 1295 },
        ],
        modifierGroups: ['salad-protein-add'],
        status: 'active',
      },
      {
        id: 'chicken-greek-salad',
        name: 'Chicken Greek Salad',
        description: 'Greek salad topped with grilled chicken fillet',
        image: '/images/food/chicken-greek-salad.jpg',
        price: 1195,
        variants: [
          { label: 'Small', price: 1195 },
          { label: 'Medium', price: 1350 },
          { label: 'Large', price: 1795 },
        ],
        status: 'active',
      },
      {
        id: 'chicken-caesar-salad',
        name: 'Chicken Caesar Salad',
        description: 'Caesar salad topped with grilled chicken fillet',
        image: '',
        price: 1350,
        variants: [
          { label: 'Small', price: 1350 },
          { label: 'Medium', price: 1450 },
          { label: 'Large', price: 1795 },
        ],
        status: 'active',
      },
      {
        id: 'chicken-country-salad',
        name: 'Chicken Country Salad',
        description: 'Country salad topped with grilled chicken fillet',
        image: '',
        price: 1450,
        variants: [
          { label: 'Small', price: 1450 },
          { label: 'Medium', price: 1550 },
          { label: 'Large', price: 1795 },
        ],
        status: 'active',
      },
    ],
  },

  /* ──────────── MANSION FAVOURITES ──────────── */
  {
    id: 'mansion-favourites',
    name: 'Mansion Favourites',
    slug: 'mansion-favourites',
    description: 'Our signature dishes — each with its own character',
    image: '/images/food/fish-and-chips.jpg',
    sortOrder: 7,
    products: [
      {
        id: 'fish-and-chips',
        name: 'Fish and Chips',
        description: 'Breaded haddock deep fried to a golden crisp and fries. Choose two sides only (salad counts as two).',
        image: '/images/food/fish-and-chips.jpg',
        price: 1495,
        modifierGroups: ['plate-sides'],
        status: 'active',
        featured: true,
      },
      {
        id: 'mansion-bbq-ribs-half',
        name: 'Mansion BBQ Ribs (Half Rack)',
        description: 'Marinated for 24 hours in our housemade sauce then grilled over an open flame and smothered in BBQ sauce. Comes with two sides only (salad counts as two).',
        image: '',
        price: 2295,
        modifierGroups: ['plate-sides'],
        status: 'active',
      },
      {
        id: 'mansion-bbq-ribs-full',
        name: 'Mansion BBQ Ribs (Full Rack)',
        description: 'Marinated for 24 hours in our housemade sauce then grilled over an open flame and smothered in BBQ sauce. Comes with two sides only (salad counts as two).',
        image: '',
        price: 2895,
        modifierGroups: ['plate-sides'],
        status: 'active',
      },
      {
        id: 'spanakopita-plate',
        name: 'Spanakopita Plate',
        description: 'Spinach and cheese pastry baked and toasted. Comes with two sides and a Greek salad.',
        image: '/images/food/spanakopita.jpg',
        price: 1595,
        modifierGroups: ['plate-sides'],
        status: 'active',
      },
      {
        id: 'fried-calamari-plate',
        name: 'Fried Calamari Plate',
        description: 'Lightly breaded fresh calamari fried to perfection. Comes with two sides and a Greek salad.',
        image: '/images/food/calamari-hq.jpg',
        price: 2395,
        modifierGroups: ['plate-sides'],
        status: 'active',
      },
      {
        id: 'grilled-calamari-plate',
        name: 'Grilled Calamari Plate',
        description: 'Freshly marinated calamari grilled with green peppers and onions. Comes with two sides and a Greek salad.',
        image: '/images/food/grilled-calamari.jpg',
        price: 2395,
        modifierGroups: ['plate-sides'],
        status: 'active',
      },
      {
        id: 'crab-cakes-plate',
        name: 'Crab Cakes Plate',
        description: 'Breaded crab cake deep fried to a crisp. Comes with two sides and a Greek salad.',
        image: '',
        price: 1895,
        variants: [
          { label: '1 Piece', price: 1895 },
          { label: '2 Pieces', price: 2295 },
        ],
        modifierGroups: ['plate-sides'],
        status: 'active',
      },
      {
        id: 'chicken-fillet-plate',
        name: 'Chicken Fillet Plate',
        description: 'Chicken breast seasoned with Greek spices cooked over an open flame. Comes with two sides and a Greek salad.',
        image: '/images/food/chicken-dinner.jpg',
        price: 1995,
        variants: [
          { label: '2 Pieces', price: 1995 },
          { label: '3 Pieces', price: 2395 },
        ],
        modifierGroups: ['plate-sides'],
        status: 'active',
      },
    ],
  },

  /* ──────────── SPECIALS ──────────── */
  {
    id: 'specials',
    name: 'Specials',
    slug: 'specials',
    description: 'Family specials and lunch boxes — great value every day',
    image: '/images/food/family-meal.jpg',
    sortOrder: 8,
    products: [
      {
        id: 'family-special-6',
        name: 'Family Special (6 People)',
        description: 'Served with rice, potatoes, Greek salad, 3 pitas, and your choice of 12 souvlaki (chicken or pork) or a large gyro',
        image: '/images/food/family-meal.jpg',
        price: 6695,
        modifierGroups: ['family-souvlaki-choice'],
        status: 'active',
        featured: true,
      },
      {
        id: 'family-special-4',
        name: 'Family Special (4 People)',
        description: 'Served with rice, potatoes, Greek salad, 2 pitas, and your choice of 8 souvlaki (chicken or pork) or a medium gyro',
        image: '/images/food/family-meal.jpg',
        price: 4695,
        modifierGroups: ['family-souvlaki-choice'],
        status: 'active',
      },
      {
        id: 'mansion-special',
        name: 'Mansion Special',
        description: 'Greek salad, rice, potato, quarter pita, and your choice of chicken, pork, or gyro (no substitutions)',
        image: '/images/food/chicken-special.jpg',
        price: 1050,
        modifierGroups: ['lunch-box-protein'],
        status: 'active',
      },
      {
        id: 'rice-lunch-box',
        name: 'Rice Lunch Box',
        description: 'Choice of chicken, pork or gyro on a bed of rice with a quarter pita, tzatziki, small bag of chips and a can of pop',
        image: '/images/food/lunch-box.jpg',
        price: 1100,
        modifierGroups: ['lunch-box-protein'],
        status: 'active',
      },
      {
        id: 'fries-lunch-box',
        name: 'Fries Lunch Box',
        description: 'Choice of chicken, pork or gyro on a bed of fries with a quarter pita, tzatziki, small bag of chips and a can of pop',
        image: '/images/food/chicken-on-fries.jpg',
        price: 1100,
        modifierGroups: ['lunch-box-protein'],
        status: 'active',
      },
    ],
  },

  /* ──────────── KIDS MENU ──────────── */
  {
    id: 'kids-menu',
    name: 'Kids Menu',
    slug: 'kids-menu',
    description: 'Each kids meal comes with a can of pop',
    image: '/images/food/chicken-fingers.jpg',
    sortOrder: 9,
    products: [
      {
        id: 'kids-chicken-fingers',
        name: 'Chicken Fingers and Fries',
        description: 'Crispy chicken fingers with fries. Comes with a can of pop.',
        image: '/images/food/chicken-fingers.jpg',
        price: 1195,
        status: 'active',
      },
      {
        id: 'kids-burger-fries',
        name: 'Burger and Fries',
        description: 'Kid-sized burger with fries. Comes with a can of pop.',
        image: '/images/food/beef-burger.jpg',
        price: 995,
        status: 'active',
      },
      {
        id: 'kids-pork-stick-fries',
        name: 'Pork Stick and Fries',
        description: 'Pork souvlaki skewer with fries. Comes with a can of pop.',
        image: '',
        price: 995,
        status: 'active',
      },
      {
        id: 'kids-chicken-stick-fries',
        name: 'Chicken Stick and Fries',
        description: 'Chicken souvlaki skewer with fries. Comes with a can of pop.',
        image: '',
        price: 995,
        status: 'active',
      },
    ],
  },

  /* ──────────── DESSERTS ──────────── */
  {
    id: 'desserts',
    name: 'Desserts',
    slug: 'desserts',
    description: 'Something sweet to finish your meal',
    sortOrder: 10,
    products: [
      {
        id: 'baklava',
        name: 'Baklava',
        description: 'Traditional layered phyllo pastry with nuts and honey syrup',
        image: '',
        price: 795,
        status: 'active',
      },
      {
        id: 'coconut-cream-pie',
        name: 'Coconut Cream Pie',
        description: 'Rich coconut cream pie (catering only)',
        image: '',
        price: 0,
        cateringOnly: true,
        status: 'active',
      },
    ],
  },

  /* ──────────── CATERING ──────────── */
  {
    id: 'catering',
    name: 'Catering Packages',
    slug: 'catering',
    description: 'All catering cash or debit only — surcharges may apply otherwise. Includes 2 souvlaki, rice, potatoes, Greek salad, tzatziki and pita per person (substitutions available upon request, extra charges may apply). No limit to number of people — call store for more details for larger parties.',
    image: '/images/food/family-meal.jpg',
    sortOrder: 11,
    products: [
      {
        id: 'catering-10',
        name: 'Catering Combo (10 People)',
        description: 'Includes 2 souvlaki, rice, potatoes, Greek salad, tzatziki and pita per person',
        image: '/images/food/family-meal.jpg',
        price: 12995,
        cateringOnly: true,
        status: 'active',
      },
      {
        id: 'catering-15',
        name: 'Catering Combo (15 People)',
        description: 'Includes 2 souvlaki, rice, potatoes, Greek salad, tzatziki and pita per person',
        image: '/images/food/family-meal.jpg',
        price: 19495,
        cateringOnly: true,
        status: 'active',
      },
      {
        id: 'catering-20',
        name: 'Catering Combo (20 People)',
        description: 'Includes 2 souvlaki, rice, potatoes, Greek salad, tzatziki and pita per person',
        image: '/images/food/family-meal.jpg',
        price: 25995,
        cateringOnly: true,
        status: 'active',
      },
      {
        id: 'catering-25',
        name: 'Catering Combo (25 People)',
        description: 'Includes 2 souvlaki, rice, potatoes, Greek salad, tzatziki and pita per person',
        image: '/images/food/family-meal.jpg',
        price: 32495,
        cateringOnly: true,
        status: 'active',
      },
    ],
  },

  /* ──────────── PITA PLATTERS ──────────── */
  {
    id: 'pita-platters',
    name: 'Pita Platters',
    slug: 'pita-platters',
    description: 'Choice of chicken, pork or falafel wraps. Gyro $1 more per wrap. Comes with a tray of fries or onion rings.',
    image: '/images/food/chicken-wrap.jpg',
    sortOrder: 12,
    products: [
      {
        id: 'pita-platter-10',
        name: 'Pita Platter (10 People)',
        description: 'Choice of chicken, pork or falafel wraps with a tray of fries or onion rings. Gyro $1 more per wrap.',
        image: '/images/food/chicken-wrap.jpg',
        price: 9500,
        modifierGroups: ['pita-platter-protein'],
        cateringOnly: true,
        status: 'active',
      },
      {
        id: 'pita-platter-15',
        name: 'Pita Platter (15 People)',
        description: 'Choice of chicken, pork or falafel wraps with a tray of fries or onion rings. Gyro $1 more per wrap.',
        image: '/images/food/chicken-wrap.jpg',
        price: 14500,
        modifierGroups: ['pita-platter-protein'],
        cateringOnly: true,
        status: 'active',
      },
    ],
  },
];

/* ── Helper: format cents to dollars ──────────────────────── */
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/* ── Helper: get all featured products ───────────────────── */
export function getFeaturedProducts(): (Product & { categoryName: string })[] {
  const featured: (Product & { categoryName: string })[] = [];
  for (const category of MENU_CATEGORIES) {
    for (const product of category.products) {
      if (product.featured) {
        featured.push({ ...product, categoryName: category.name });
      }
    }
  }
  return featured;
}

