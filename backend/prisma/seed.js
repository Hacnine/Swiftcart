import prisma from '../src/config/database.js';
import { hashPassword } from '../src/utils/password.js';
import { generateSlug } from '../src/utils/helpers.js';

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Admin User
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@swiftcart.com' },
    update: {},
    create: {
      email: 'admin@swiftcart.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      status: 'ACTIVE',
      isEmailVerified: true,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create Categories
  const categories = [
    {
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      slug: 'electronics',
      icon: '📱',
    },
    {
      name: 'Fashion',
      description: 'Clothing, shoes, and accessories',
      slug: 'fashion',
      icon: '👗',
    },
    {
      name: 'Home & Garden',
      description: 'Home decor and garden supplies',
      slug: 'home-garden',
      icon: '🏠',
    },
    {
      name: 'Sports & Outdoors',
      description: 'Sports equipment and outdoor gear',
      slug: 'sports-outdoors',
      icon: '⚽',
    },
    {
      name: 'Beauty & Health',
      description: 'Beauty products and health supplies',
      slug: 'beauty-health',
      icon: '💄',
    },
    {
      name: 'Toys & Games',
      description: 'Toys, games, and entertainment',
      slug: 'toys-games',
      icon: '🎮',
    },
  ];

  const createdCategories = [];
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    createdCategories.push(category);
    console.log('✅ Category created:', category.name);
  }

  // Create Brands
  const brands = [
    { name: 'Samsung', slug: 'samsung' },
    { name: 'Apple', slug: 'apple' },
    { name: 'Nike', slug: 'nike' },
    { name: 'Adidas', slug: 'adidas' },
    { name: 'Sony', slug: 'sony' },
    { name: 'LG', slug: 'lg' },
  ];

  const createdBrands = [];
  for (const brand of brands) {
    const created = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: brand,
    });
    createdBrands.push(created);
    console.log('✅ Brand created:', created.name);
  }

  // Create Demo Vendor Users
  const vendorPassword = await hashPassword('password123');
  
  const vendor1User = await prisma.user.upsert({
    where: { email: 'vendor1@example.com' },
    update: {},
    create: {
      email: 'vendor1@example.com',
      password: vendorPassword,
      firstName: 'John',
      lastName: 'Seller',
      role: 'SELLER',
      status: 'ACTIVE',
      isEmailVerified: true,
    },
  });

  const vendor2User = await prisma.user.upsert({
    where: { email: 'vendor2@example.com' },
    update: {},
    create: {
      email: 'vendor2@example.com',
      password: vendorPassword,
      firstName: 'Jane',
      lastName: 'Merchant',
      role: 'SELLER',
      status: 'ACTIVE',
      isEmailVerified: true,
    },
  });

  // Create Vendors
  const vendor1 = await prisma.vendor.upsert({
    where: { userId: vendor1User.id },
    update: {},
    create: {
      userId: vendor1User.id,
      storeName: 'TechWholesale Pro',
      storeSlug: 'techwholesale-pro',
      storeDescription: 'Premium electronics at wholesale prices',
      vendorType: 'WHOLESALER',
      status: 'APPROVED',
      isVerified: true,
      verifiedAt: new Date(),
      businessName: 'TechWholesale Inc',
      businessEmail: 'contact@techwholesale.com',
      businessPhone: '+1234567890',
      businessAddress: '123 Tech Street',
      country: 'United States',
    },
  });

  const vendor2 = await prisma.vendor.upsert({
    where: { userId: vendor2User.id },
    update: {},
    create: {
      userId: vendor2User.id,
      storeName: 'Fashion Bulk Store',
      storeSlug: 'fashion-bulk-store',
      storeDescription: 'Trendy fashion items in bulk',
      vendorType: 'DISTRIBUTOR',
      status: 'APPROVED',
      isVerified: true,
      verifiedAt: new Date(),
      businessName: 'Fashion Distributors LLC',
      businessEmail: 'contact@fashionbulk.com',
      businessPhone: '+1234567891',
      businessAddress: '456 Fashion Ave',
      country: 'United States',
    },
  });

  console.log('✅ Vendors created');

  // Create Demo Products
  const products = [
    {
      title: 'Wireless Bluetooth Headphones - Bulk Pack',
      description: 'High-quality wireless headphones with noise cancellation. Perfect for wholesale distribution.',
      shortDescription: 'Premium wireless headphones with 30-hour battery life',
      categoryId: createdCategories[0].id,
      brandId: createdBrands[4].id,
      vendorId: vendor1.id,
      basePrice: 25.99,
      stock: 5000,
      minimumOrderQty: 50,
      sku: 'WHD-BT-001',
      slug: 'wireless-bluetooth-headphones-bulk',
      status: 'ACTIVE',
      isFeatured: true,
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      ],
      priceRanges: [
        { minQuantity: 50, maxQuantity: 99, price: 25.99 },
        { minQuantity: 100, maxQuantity: 499, price: 22.99 },
        { minQuantity: 500, maxQuantity: null, price: 19.99 },
      ],
      specifications: [
        { name: 'Battery Life', value: '30 hours' },
        { name: 'Bluetooth Version', value: '5.0' },
        { name: 'Weight', value: '250g' },
      ],
    },
    {
      title: 'Smart Watch Fitness Tracker - Wholesale',
      description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and app notifications.',
      shortDescription: 'Smart fitness tracker with multiple sport modes',
      categoryId: createdCategories[0].id,
      brandId: createdBrands[0].id,
      vendorId: vendor1.id,
      basePrice: 45.99,
      stock: 3000,
      minimumOrderQty: 25,
      sku: 'SMW-FT-002',
      slug: 'smart-watch-fitness-tracker-wholesale',
      status: 'ACTIVE',
      isFeatured: true,
      isNewArrival: true,
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      ],
      priceRanges: [
        { minQuantity: 25, maxQuantity: 99, price: 45.99 },
        { minQuantity: 100, maxQuantity: 299, price: 42.99 },
        { minQuantity: 300, maxQuantity: null, price: 39.99 },
      ],
    },
    {
      title: 'Men\'s Cotton T-Shirts - Bulk Assorted Colors',
      description: 'Premium quality cotton t-shirts in assorted colors. Perfect for retailers and distributors.',
      shortDescription: '100% cotton comfortable t-shirts',
      categoryId: createdCategories[1].id,
      brandId: createdBrands[2].id,
      vendorId: vendor2.id,
      basePrice: 5.99,
      stock: 10000,
      minimumOrderQty: 100,
      sku: 'TSH-CT-003',
      slug: 'mens-cotton-tshirts-bulk',
      status: 'ACTIVE',
      isBestSeller: true,
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      ],
      priceRanges: [
        { minQuantity: 100, maxQuantity: 499, price: 5.99 },
        { minQuantity: 500, maxQuantity: 999, price: 4.99 },
        { minQuantity: 1000, maxQuantity: null, price: 3.99 },
      ],
    },
    {
      title: 'Yoga Mat Set with Carry Bag - Wholesale',
      description: 'Eco-friendly yoga mats with carrying bag. Non-slip surface, perfect for gyms and retailers.',
      shortDescription: 'Premium yoga mat with accessories',
      categoryId: createdCategories[3].id,
      vendorId: vendor2.id,
      basePrice: 18.99,
      stock: 2000,
      minimumOrderQty: 30,
      sku: 'YGA-MAT-004',
      slug: 'yoga-mat-set-wholesale',
      status: 'ACTIVE',
      images: [
        'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
      ],
      priceRanges: [
        { minQuantity: 30, maxQuantity: 99, price: 18.99 },
        { minQuantity: 100, maxQuantity: null, price: 15.99 },
      ],
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
    console.log('✅ Product created:', product.title);
  }

  // Create Demo Buyer
  const buyerPassword = await hashPassword('Buyer@123456');
  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@example.com' },
    update: {},
    create: {
      email: 'buyer@example.com',
      password: buyerPassword,
      firstName: 'Michael',
      lastName: 'Buyer',
      role: 'BUYER',
      status: 'ACTIVE',
      isEmailVerified: true,
    },
  });
  console.log('✅ Demo buyer created:', buyer.email);

  // Create System Settings
  await prisma.systemSetting.upsert({
    where: { key: 'site_name' },
    update: {},
    create: {
      key: 'site_name',
      value: 'Wholesale Marketplace',
      description: 'The name of the marketplace',
    },
  });

  await prisma.systemSetting.upsert({
    where: { key: 'commission_rate' },
    update: {},
    create: {
      key: 'commission_rate',
      value: 0.15,
      description: 'Platform commission rate (15%)',
    },
  });

  console.log('✅ System settings created');

  console.log('\n🎉 Database seed completed successfully!\n');
  console.log('📝 Demo Accounts:');
  console.log('   Admin: admin@swiftcart.com / admin123');
  console.log('   Vendor 1: vendor1@example.com / password123');
  console.log('   Vendor 2: vendor2@example.com / password123');
  console.log('   Buyer: buyer@example.com / Buyer@123456\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
