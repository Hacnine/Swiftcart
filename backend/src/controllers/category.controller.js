import prisma from '../config/database.js';
import { generateSlug } from '../utils/helpers.js';

export const getCategories = async (req, res, next) => {
  try {
    const { parentId } = req.query;
    
    const where = parentId ? { parentId } : { parentId: null };
    
    const categories = await prisma.category.findMany({
      where: { ...where, isActive: true },
      orderBy: { order: 'asc' },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

export const getCategoryTree = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null, isActive: true },
      orderBy: { order: 'asc' },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
          include: {
            children: {
              where: { isActive: true },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.id },
      include: {
        parent: true,
        children: true,
        _count: { select: { products: true } },
      },
    });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description, image, icon, parentId, order } = req.body;
    const slug = generateSlug(name);

    const category = await prisma.category.create({
      data: { name, slug, description, image, icon, parentId, order },
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await prisma.category.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await prisma.category.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
};
