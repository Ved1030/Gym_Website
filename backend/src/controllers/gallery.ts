import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const getGallery = async (_req: Request, res: Response) => {
  try {
    const transformations = await prisma.transformation.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    res.json({ data: transformations });
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
};

export const createTransformation = async (req: Request, res: Response) => {
  try {
    const transformation = await prisma.transformation.create({ data: req.body });
    res.status(201).json({ message: 'Transformation created', data: transformation });
  } catch (error) {
    console.error('Create transformation error:', error);
    res.status(500).json({ error: 'Failed to create transformation' });
  }
};

export const updateTransformation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transformation = await prisma.transformation.update({
      where: { id },
      data: req.body,
    });
    res.json({ message: 'Transformation updated', data: transformation });
  } catch (error) {
    console.error('Update transformation error:', error);
    res.status(500).json({ error: 'Failed to update transformation' });
  }
};

export const deleteTransformation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.transformation.delete({ where: { id } });
    res.json({ message: 'Transformation deleted' });
  } catch (error) {
    console.error('Delete transformation error:', error);
    res.status(500).json({ error: 'Failed to delete transformation' });
  }
};
