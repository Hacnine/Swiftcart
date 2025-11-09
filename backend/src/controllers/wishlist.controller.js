import prisma from '../config/database.js';

export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await prisma.wishlistItem.findMany({
      where: { userId: req.user.id },
      include: {
        product: {
          include: {
            vendor: { select: { storeName: true } },
            category: { select: { name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: wishlist });
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const existing = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId,
        },
      },
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'Product already in wishlist' });
    }

    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: req.user.id,
        productId,
      },
      include: { product: true },
    });

    res.status(201).json({ success: true, data: wishlistItem });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    await prisma.wishlistItem.delete({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId,
        },
      },
    });

    res.json({ success: true, message: 'Removed from wishlist' });
  } catch (error) {
    next(error);
  }
};
