import prisma from '../config/database.js';

export const getReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { productId, isApproved: true },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { firstName: true, lastName: true, avatar: true } },
        },
      }),
      prisma.review.count({ where: { productId, isApproved: true } }),
    ]);

    res.json({ success: true, data: reviews, meta: { total, page: parseInt(page), limit: parseInt(limit) } });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { productId, orderId, rating, title, comment, images } = req.body;

    // Verify user purchased the product
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        buyerId: req.user.id,
        status: 'DELIVERED',
        items: { some: { productId } },
      },
    });

    if (!order) {
      return res.status(403).json({ success: false, message: 'You can only review purchased products' });
    }

    // Check if already reviewed
    const existing = await prisma.review.findUnique({
      where: {
        userId_productId_orderId: {
          userId: req.user.id,
          productId,
          orderId,
        },
      },
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'You already reviewed this product' });
    }

    const review = await prisma.review.create({
      data: {
        userId: req.user.id,
        productId,
        orderId,
        rating: parseInt(rating),
        title,
        comment,
        images: images || [],
      },
      include: {
        user: { select: { firstName: true, lastName: true, avatar: true } },
      },
    });

    // Update product rating
    const avgRating = await prisma.review.aggregate({
      where: { productId, isApproved: true },
      _avg: { rating: true },
      _count: true,
    });

    await prisma.product.update({
      where: { id: productId },
      data: {
        averageRating: avgRating._avg.rating || 0,
        totalReviews: avgRating._count,
      },
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const review = await prisma.review.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    const updated = await prisma.review.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    await prisma.review.deleteMany({
      where: { id: req.params.id, userId: req.user.id },
    });

    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
};

export const addVendorReply = async (req, res, next) => {
  try {
    const { vendorReply } = req.body;

    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const review = await prisma.review.findUnique({
      where: { id: req.params.id },
      include: { product: true },
    });

    if (!review || review.product.vendorId !== vendor.id) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    const updated = await prisma.review.update({
      where: { id: req.params.id },
      data: { vendorReply, vendorRepliedAt: new Date() },
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};
