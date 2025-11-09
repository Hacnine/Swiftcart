import prisma from '../config/database.js';

export const getDisputes = async (req, res, next) => {
  try {
    const disputes = await prisma.dispute.findMany({
      where: {
        order: { buyerId: req.user.id },
      },
      include: {
        order: {
          include: {
            vendor: { select: { storeName: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: disputes });
  } catch (error) {
    next(error);
  }
};

export const createDispute = async (req, res, next) => {
  try {
    const { orderId, reason, description, evidence } = req.body;

    const order = await prisma.order.findFirst({
      where: { id: orderId, buyerId: req.user.id },
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const dispute = await prisma.dispute.create({
      data: {
        orderId,
        reason,
        description,
        evidence: evidence || [],
      },
      include: {
        order: true,
      },
    });

    res.status(201).json({ success: true, data: dispute });
  } catch (error) {
    next(error);
  }
};

export const updateDispute = async (req, res, next) => {
  try {
    const dispute = await prisma.dispute.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ success: true, data: dispute });
  } catch (error) {
    next(error);
  }
};

export const resolveDispute = async (req, res, next) => {
  try {
    const { resolution } = req.body;

    const dispute = await prisma.dispute.update({
      where: { id: req.params.id },
      data: {
        status: 'RESOLVED',
        resolution,
        resolvedAt: new Date(),
      },
    });

    res.json({ success: true, data: dispute });
  } catch (error) {
    next(error);
  }
};
