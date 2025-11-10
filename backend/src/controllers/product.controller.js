import prisma from '../config/database.js';
import { generateSlug, generateSKU, calculatePagination, getPaginationMeta, getFilterOptions, getSortOptions } from '../utils/helpers.js';

// @desc    Get all products with filters
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sortBy = 'createdAt', order = 'desc', ...filters } = req.query;
    
    const { skip, limit: take } = calculatePagination(page, limit);
    const where = getFilterOptions(filters);
    const orderBy = getSortOptions(sortBy, order);

    // Only show active products for non-sellers
    if (!req.user || req.user.role !== 'SELLER') {
      where.status = 'ACTIVE';
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          brand: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
          vendor: {
            select: {
              id: true,
              storeName: true,
              storeSlug: true,
              averageRating: true,
              isVerified: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    const meta = getPaginationMeta(total, parseInt(page), parseInt(limit));

    res.json({
      success: true,
      data: products,
      meta,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
export const searchProducts = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const { skip, limit: take } = calculatePagination(page, limit);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: {
          status: 'ACTIVE',
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
            { shortDescription: { contains: q, mode: 'insensitive' } },
            { metaKeywords: { has: q } },
          ],
        },
        skip,
        take,
        include: {
          category: { select: { name: true } },
          brand: { select: { name: true, logo: true } },
          vendor: { select: { storeName: true, averageRating: true } },
        },
      }),
      prisma.product.count({
        where: {
          status: 'ACTIVE',
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    const meta = getPaginationMeta(total, parseInt(page), parseInt(limit));

    res.json({
      success: true,
      data: products,
      meta,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        vendor: {
          select: {
            id: true,
            storeName: true,
            storeSlug: true,
            storeLogo: true,
            averageRating: true,
            totalReviews: true,
            isVerified: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        variants: true,
        reviews: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Increment view count
    await prisma.product.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private (Seller)
export const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      shortDescription,
      categoryId,
      brandId,
      images,
      videos,
      thumbnail,
      basePrice,
      priceRanges,
      stock,
      minimumOrderQty,
      maximumOrderQty,
      specifications,
      weight,
      length,
      width,
      height,
      shippingClass,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    // Get vendor for the user
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (!vendor) {
      return res.status(403).json({
        success: false,
        message: 'You must be a verified vendor to create products',
      });
    }

    if (vendor.status !== 'APPROVED') {
      return res.status(403).json({
        success: false,
        message: 'Your vendor account must be approved to create products',
      });
    }

    // Generate slug and SKU
    const slug = generateSlug(title);
    const sku = generateSKU('PRD');

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        shortDescription,
        categoryId,
        brandId,
        images: images || [],
        videos: videos || [],
        thumbnail,
        basePrice: parseFloat(basePrice),
        priceRanges: priceRanges || [],
        sku,
        stock: parseInt(stock) || 0,
        minimumOrderQty: parseInt(minimumOrderQty) || 1,
        maximumOrderQty: maximumOrderQty ? parseInt(maximumOrderQty) : null,
        specifications: specifications || [],
        weight: weight ? parseFloat(weight) : null,
        length: length ? parseFloat(length) : null,
        width: width ? parseFloat(width) : null,
        height: height ? parseFloat(height) : null,
        shippingClass,
        metaTitle,
        metaDescription,
        metaKeywords: metaKeywords || [],
        vendorId: vendor.id,
        status: 'DRAFT',
      },
      include: {
        category: true,
        brand: true,
        vendor: {
          select: {
            storeName: true,
            storeSlug: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Seller)
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Get vendor
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (!vendor) {
      return res.status(403).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    // Check product ownership
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (product.vendorId !== vendor.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this product',
      });
    }

    // Update slug if title changed
    let updateData = { ...req.body };
    if (req.body.title && req.body.title !== product.title) {
      updateData.slug = generateSlug(req.body.title);
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        brand: true,
        vendor: {
          select: {
            storeName: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Seller)
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (product.vendorId !== vendor.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this product',
      });
    }

    await prisma.product.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get products by vendor
// @route   GET /api/products/vendor/:vendorId
// @access  Public
export const getProductsByVendor = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const { skip, limit: take } = calculatePagination(page, limit);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: {
          vendorId,
          status: 'ACTIVE',
        },
        skip,
        take,
        include: {
          category: { select: { name: true } },
          brand: { select: { name: true, logo: true } },
        },
      }),
      prisma.product.count({
        where: {
          vendorId,
          status: 'ACTIVE',
        },
      }),
    ]);

    const meta = getPaginationMeta(total, parseInt(page), parseInt(limit));

    res.json({
      success: true,
      data: products,
      meta,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const { limit = 12 } = req.query;

    const products = await prisma.product.findMany({
      where: {
        status: 'ACTIVE',
        isFeatured: true,
      },
      take: parseInt(limit),
      include: {
        category: { select: { name: true } },
        brand: { select: { name: true, logo: true } },
        vendor: { select: { storeName: true, averageRating: true } },
      },
    });

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get new arrivals
// @route   GET /api/products/new-arrivals
// @access  Public
export const getNewArrivals = async (req, res, next) => {
  try {
    const { limit = 12 } = req.query;

    const products = await prisma.product.findMany({
      where: {
        status: 'ACTIVE',
      },
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
      include: {
        category: { select: { name: true } },
        brand: { select: { name: true, logo: true } },
        vendor: { select: { storeName: true } },
      },
    });

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get best sellers
// @route   GET /api/products/best-sellers
// @access  Public
export const getBestSellers = async (req, res, next) => {
  try {
    const { limit = 12 } = req.query;

    const products = await prisma.product.findMany({
      where: {
        status: 'ACTIVE',
      },
      take: parseInt(limit),
      orderBy: { soldCount: 'desc' },
      include: {
        category: { select: { name: true } },
        brand: { select: { name: true, logo: true } },
        vendor: { select: { storeName: true } },
      },
    });

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product stock
// @route   PATCH /api/products/:id/stock
// @access  Private (Seller)
export const updateProductStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product || product.vendorId !== vendor.id) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        stock: parseInt(stock),
        status: parseInt(stock) === 0 ? 'OUT_OF_STOCK' : 'ACTIVE',
      },
    });

    res.json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add product variant
// @route   POST /api/products/:id/variants
// @access  Private (Seller)
export const addProductVariant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, attributes, price, stock, image } = req.body;

    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product || product.vendorId !== vendor.id) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const sku = generateSKU('VAR');

    const variant = await prisma.productVariant.create({
      data: {
        productId: id,
        name,
        sku,
        attributes,
        price: parseFloat(price),
        stock: parseInt(stock),
        image,
      },
    });

    // Update product to mark it has variants
    await prisma.product.update({
      where: { id },
      data: { hasVariants: true },
    });

    res.status(201).json({
      success: true,
      data: variant,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product variant
// @route   PUT /api/products/:id/variants/:variantId
// @access  Private (Seller)
export const updateProductVariant = async (req, res, next) => {
  try {
    const { id, variantId } = req.params;

    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product || product.vendorId !== vendor.id) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const variant = await prisma.productVariant.update({
      where: { id: variantId },
      data: req.body,
    });

    res.json({
      success: true,
      data: variant,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product variant
// @route   DELETE /api/products/:id/variants/:variantId
// @access  Private (Seller)
export const deleteProductVariant = async (req, res, next) => {
  try {
    const { id, variantId } = req.params;

    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product || product.vendorId !== vendor.id) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    await prisma.productVariant.delete({
      where: { id: variantId },
    });

    // Check if there are any variants left
    const variantsCount = await prisma.productVariant.count({
      where: { productId: id },
    });

    if (variantsCount === 0) {
      await prisma.product.update({
        where: { id },
        data: { hasVariants: false },
      });
    }

    res.json({
      success: true,
      message: 'Variant deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
