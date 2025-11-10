import prisma from '../config/database.js';
import { sendVendorApprovalEmail } from '../utils/email.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalVendors,
      pendingVendors,
      totalProducts,
      totalOrders,
      totalRevenue,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.vendor.count({ where: { status: 'APPROVED' } }),
      prisma.vendor.count({ where: { status: 'PENDING' } }),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        where: { status: 'DELIVERED' },
        _sum: { totalAmount: true },
      }),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalVendors,
        pendingVendors,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, role, status } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (role) where.role = role;
    if (status) where.status = status;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: parseInt(limit),
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          status: true,
          createdAt: true,
          lastLogin: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: users,
      meta: { total, page: parseInt(page), limit: parseInt(limit) },
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: {
        vendor: true,
        orders: { take: 5, orderBy: { createdAt: 'desc' } },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

export const approveVendor = async (req, res, next) => {
  try {
    const vendor = await prisma.vendor.update({
      where: { id: req.params.id },
      data: {
        status: 'APPROVED',
        isVerified: true,
        verifiedAt: new Date(),
      },
      include: { user: true },
    });

    // Send approval email
    sendVendorApprovalEmail(vendor, vendor.user).catch(console.error);

    // Create notification
    await prisma.notification.create({
      data: {
        userId: vendor.userId,
        type: 'VENDOR_APPROVED',
        title: 'Vendor Account Approved',
        message: 'Your vendor account has been approved. You can now start selling!',
        link: '/vendor/dashboard',
      },
    });

    res.json({ success: true, data: vendor });
  } catch (error) {
    next(error);
  }
};

export const rejectVendor = async (req, res, next) => {
  try {
    const { reason } = req.body;

    const vendor = await prisma.vendor.update({
      where: { id: req.params.id },
      data: { status: 'REJECTED' },
      include: { user: true },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId: vendor.userId,
        type: 'VENDOR_REJECTED',
        title: 'Vendor Account Rejected',
        message: reason || 'Your vendor account application has been rejected.',
      },
    });

    res.json({ success: true, data: vendor });
  } catch (error) {
    next(error);
  }
};
