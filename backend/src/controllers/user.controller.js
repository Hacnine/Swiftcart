import prisma from '../config/database.js';

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: req.body,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
      },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.user.id },
      orderBy: { isDefault: 'desc' },
    });

    res.json({ success: true, data: addresses });
  } catch (error) {
    next(error);
  }
};

export const createAddress = async (req, res, next) => {
  try {
    const address = await prisma.address.create({
      data: {
        ...req.body,
        userId: req.user.id,
      },
    });

    res.status(201).json({ success: true, data: address });
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const address = await prisma.address.updateMany({
      where: { id: req.params.id, userId: req.user.id },
      data: req.body,
    });

    res.json({ success: true, data: address });
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    await prisma.address.deleteMany({
      where: { id: req.params.id, userId: req.user.id },
    });

    res.json({ success: true, message: 'Address deleted' });
  } catch (error) {
    next(error);
  }
};

export const setDefaultAddress = async (req, res, next) => {
  try {
    await prisma.address.updateMany({
      where: { userId: req.user.id },
      data: { isDefault: false },
    });

    await prisma.address.updateMany({
      where: { id: req.params.id, userId: req.user.id },
      data: { isDefault: true },
    });

    res.json({ success: true, message: 'Default address updated' });
  } catch (error) {
    next(error);
  }
};
