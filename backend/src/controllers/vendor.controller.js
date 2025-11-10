import prisma from '../config/database.js';
import { generateSlug } from '../utils/helpers.js';
import { sendVendorApprovalEmail } from '../utils/email.js';

// @desc    Register as vendor
// @route   POST /api/vendors/register
// @access  Private
export const registerVendor = async (req, res, next) => {
  try {
    const {
      storeName,
      storeDescription,
      vendorType,
      businessName,
      businessLicense,
      taxId,
      businessEmail,
      businessPhone,
      businessAddress,
      country,
    } = req.body;

    // Check if user already has a vendor account
    const existingVendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (existingVendor) {
      return res.status(400).json({
        success: false,
        message: 'You already have a vendor account',
      });
    }

    // Check if store name is taken
    const storeNameExists = await prisma.vendor.findUnique({
      where: { storeName },
    });

    if (storeNameExists) {
      return res.status(400).json({
        success: false,
        message: 'Store name already taken',
      });
    }

    const storeSlug = generateSlug(storeName);

    const vendor = await prisma.vendor.create({
      data: {
        userId: req.user.id,
        storeName,
        storeSlug,
        storeDescription,
        vendorType,
        businessName,
        businessLicense,
        taxId,
        businessEmail,
        businessPhone,
        businessAddress,
        country,
        status: 'PENDING',
      },
    });

    // Update user role to SELLER
    await prisma.user.update({
      where: { id: req.user.id },
      data: { role: 'SELLER' },
    });

    res.status(201).json({
      success: true,
      message: 'Vendor registration submitted for approval',
      data: vendor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get vendor profile
// @route   GET /api/vendors/profile
// @access  Private (Seller)
export const getVendorProfile = async (req, res, next) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor profile not found',
      });
    }

    res.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update vendor profile
// @route   PUT /api/vendors/profile
// @access  Private (Seller)
export const updateVendorProfile = async (req, res, next) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor profile not found',
      });
    }

    const updatedVendor = await prisma.vendor.update({
      where: { id: vendor.id },
      data: req.body,
    });

    res.json({
      success: true,
      data: updatedVendor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get vendor statistics
// @route   GET /api/vendors/stats
// @access  Private (Seller)
export const getVendorStats = async (req, res, next) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    const [
      totalProducts,
      activeProducts,
      totalOrders,
      pendingOrders,
      totalRevenue,
      totalReviews,
    ] = await Promise.all([
      prisma.product.count({ where: { vendorId: vendor.id } }),
      prisma.product.count({ where: { vendorId: vendor.id, status: 'ACTIVE' } }),
      prisma.order.count({ where: { vendorId: vendor.id } }),
      prisma.order.count({ where: { vendorId: vendor.id, status: 'PENDING' } }),
      prisma.order.aggregate({
        where: { vendorId: vendor.id, status: { in: ['DELIVERED', 'COMPLETED'] } },
        _sum: { totalAmount: true },
      }),
      prisma.review.count({
        where: {
          product: { vendorId: vendor.id },
        },
      }),
    ]);

    res.json({
      success: true,
      data: {
        totalProducts,
        activeProducts,
        totalOrders,
        pendingOrders,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        totalReviews,
        averageRating: vendor.averageRating,
        totalSales: vendor.totalSales,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get vendor orders
// @route   GET /api/vendors/orders
// @access  Private (Seller)
export const getVendorOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: 'Vendor not found',
      });
    }

    const where = { vendorId: vendor.id };
    if (status) {
      where.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          buyer: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          items: {
            include: {
              product: {
                select: {
                  title: true,
                  thumbnail: true,
                },
              },
            },
          },
          shippingAddress: true,
        },
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      success: true,
      data: orders,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PATCH /api/vendors/orders/:orderId/status
// @access  Private (Seller)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status, trackingNumber, shippingCarrier } = req.body;

    const vendor = await prisma.vendor.findUnique({
      where: { userId: req.user.id },
    });

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: true,
      },
    });

    if (!order || order.vendorId !== vendor.id) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    const updateData = { status };

    if (status === 'SHIPPED') {
      updateData.shippedAt = new Date();
      updateData.trackingNumber = trackingNumber;
      updateData.shippingCarrier = shippingCarrier;
    } else if (status === 'DELIVERED') {
      updateData.deliveredAt = new Date();
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    // Create notification for buyer
    await prisma.notification.create({
      data: {
        userId: order.buyerId,
        type: status === 'SHIPPED' ? 'ORDER_SHIPPED' : 'ORDER_DELIVERED',
        title: `Order ${status}`,
        message: `Your order #${order.orderNumber} has been ${status.toLowerCase()}`,
        link: `/orders/${order.id}`,
      },
    });

    // Send socket notification
    const io = req.app.get('io');
    if (io) {
      io.to(`user-${order.buyerId}`).emit('notification', {
        type: 'order-update',
        orderId: order.id,
        status,
      });
    }

    res.json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};
