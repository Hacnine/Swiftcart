import prisma from '../config/database.js';

export const getCart = async (req, res, next) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: {
        product: {
          include: {
            vendor: { select: { storeName: true, id: true } },
          },
        },
      },
    });

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    res.json({ success: true, data: { items: cartItems, total } });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity, variantId } = req.body;

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if already in cart
    const existing = await prisma.cartItem.findFirst({
      where: { userId: req.user.id, productId, variantId },
    });

    let cartItem;
    if (existing) {
      cartItem = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
        include: { product: true },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          userId: req.user.id,
          productId,
          variantId,
          quantity,
          price: product.basePrice,
        },
        include: { product: true },
      });
    }

    res.status(201).json({ success: true, data: cartItem });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    const cartItem = await prisma.cartItem.findFirst({
      where: { id: req.params.itemId, userId: req.user.id },
    });

    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    const updated = await prisma.cartItem.update({
      where: { id: req.params.itemId },
      data: { quantity },
      include: { product: true },
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    await prisma.cartItem.deleteMany({
      where: { id: req.params.itemId, userId: req.user.id },
    });

    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    await prisma.cartItem.deleteMany({ where: { userId: req.user.id } });
    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
};
