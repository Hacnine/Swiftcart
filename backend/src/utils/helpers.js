import crypto from 'crypto';

export const generateOrderNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const generateSKU = (prefix = 'PRD') => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

export const calculatePagination = (page, limit) => {
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 20;
  const skip = (pageNum - 1) * limitNum;
  
  return {
    page: pageNum,
    limit: limitNum,
    skip,
  };
};

export const getPaginationMeta = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

export const sanitizeUser = (user) => {
  const { password, resetPasswordToken, resetPasswordExpire, ...sanitized } = user;
  return sanitized;
};

export const getFilterOptions = (filters) => {
  const where = {};

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  if (filters.categoryId) {
    where.categoryId = filters.categoryId;
  }

  if (filters.brandId) {
    where.brandId = filters.brandId;
  }

  if (filters.minPrice || filters.maxPrice) {
    where.basePrice = {};
    if (filters.minPrice) where.basePrice.gte = parseFloat(filters.minPrice);
    if (filters.maxPrice) where.basePrice.lte = parseFloat(filters.maxPrice);
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.isFeatured !== undefined) {
    where.isFeatured = filters.isFeatured === 'true';
  }

  return where;
};

export const getSortOptions = (sortBy = 'createdAt', order = 'desc') => {
  return {
    [sortBy]: order.toLowerCase(),
  };
};
