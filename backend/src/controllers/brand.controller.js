import prisma from '../config/database.js';
import { generateSlug } from '../utils/helpers.js';

export const getBrands = async (req, res, next) => {
  try {
    const brands = await prisma.brand.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { products: true } },
      },
    });

    res.json({ success: true, data: brands });
  } catch (error) {
    next(error);
  }
};

export const getBrand = async (req, res, next) => {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id: req.params.id },
      include: {
        _count: { select: { products: true } },
      },
    });

    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    res.json({ success: true, data: brand });
  } catch (error) {
    next(error);
  }
};

export const createBrand = async (req, res, next) => {
  try {
    const { name, logo, description, website } = req.body;
    const slug = generateSlug(name);

    const brand = await prisma.brand.create({
      data: { name, slug, logo, description, website },
    });

    res.status(201).json({ success: true, data: brand });
  } catch (error) {
    next(error);
  }
};

export const updateBrand = async (req, res, next) => {
  try {
    const brand = await prisma.brand.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ success: true, data: brand });
  } catch (error) {
    next(error);
  }
};

export const deleteBrand = async (req, res, next) => {
  try {
    await prisma.brand.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Brand deleted' });
  } catch (error) {
    next(error);
  }
};
