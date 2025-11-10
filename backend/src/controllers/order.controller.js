import prisma from '../config/database.js';
import { generateOrderNumber, calculatePagination, getPaginationMeta } from '../utils/helpers.js';
import { sendOrderConfirmationEmail } from '../utils/email.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddressId, paymentMethod, couponCode } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Verify address
    const address = await prisma.address.findFirst({
      where: { id: shippingAddressId, userId: req.user.id },
    });

    if (!address) {
      return res.status(404).json({ success: false, message: 'Shipping address not found' });
    }

    // Group items by vendor
    const itemsByVendor = {};
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { vendor: true },
      });

      if (!product) continue;

      if (!itemsByVendor[product.vendorId]) {
        itemsByVendor[product.vendorId] = [];
      }

      itemsByVendor[product.vendorId].push({
        ...item,
        product,
      });
    }

    // Create orders for each vendor
    const orders = [];
    for (const [vendorId, vendorItems] of Object.entries(itemsByVendor)) {
      const subtotal = vendorItems.reduce(
        (sum, item) => sum + item.product.basePrice * item.quantity,
        0
      );
      const shippingCost = 10; // Calculate based on weight/distance
      const taxAmount = subtotal * 0.1; // 10% tax
      const totalAmount = subtotal + shippingCost + taxAmount;

      const order = await prisma.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          buyerId: req.user.id,
          vendorId,
          subtotal,
          shippingCost,
          taxAmount,
          totalAmount,
          paymentMethod,
          shippingAddressId,
          items: {
            create: vendorItems.map((item) => ({
              productId: item.productId,
              productTitle: item.product.title,
              productImage: item.product.thumbnail,
              sku: item.product.sku,
              variantId: item.variantId,
              variantName: item.variantName,
              quantity: item.quantity,
              unitPrice: item.product.basePrice,
              totalPrice: item.product.basePrice * item.quantity,
            })),
          },
        },
        include: {
          items: true,
          vendor: { select: { storeName: true } },
          shippingAddress: true,
        },
      });

      orders.push(order);

      // Update product sold count
      for (const item of vendorItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            soldCount: { increment: item.quantity },
            stock: { decrement: item.quantity },
          },
        });
      }

      // Send notification
      sendOrderConfirmationEmail(order, req.user).catch(console.error);
    }

    // Clear cart
    await prisma.cartItem.deleteMany({ where: { userId: req.user.id } });

    res.status(201).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const { skip, limit: take } = calculatePagination(page, limit);

    const where = { buyerId: req.user.id };
    if (status) where.status = status;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          items: { include: { product: { select: { title: true, thumbnail: true } } } },
          vendor: { select: { storeName: true } },
        },
      }),
      prisma.order.count({ where }),
    ]);

    const meta = getPaginationMeta(total, parseInt(page), parseInt(limit));

    res.json({ success: true, data: orders, meta });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await prisma.order.findFirst({
      where: { id: req.params.id, buyerId: req.user.id },
      include: {
        items: { include: { product: true } },
        vendor: { select: { storeName: true, businessEmail: true } },
        shippingAddress: true,
      },
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { skip, limit: take } = calculatePagination(page, limit);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          buyer: { select: { firstName: true, lastName: true, email: true } },
          vendor: { select: { storeName: true } },
        },
      }),
      prisma.order.count(),
    ]);

    const meta = getPaginationMeta(total, parseInt(page), parseInt(limit));

    res.json({ success: true, data: orders, meta });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const order = await prisma.order.findFirst({
      where: { id: req.params.id, buyerId: req.user.id },
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
      return res.status(400).json({ success: false, message: 'Order cannot be cancelled' });
    }

    const updated = await prisma.order.update({
      where: { id: req.params.id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        cancellationReason: req.body.reason,
      },
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};
