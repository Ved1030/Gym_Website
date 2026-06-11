import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const { name, rating, text, image } = req.body;
    const testimonial = await prisma.review.create({
      data: { name, rating, text, image },
    });
    res.status(201).json({ message: 'Testimonial created', data: testimonial });
  } catch (error) {
    console.error('Testimonial error:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
};

export const getTestimonials = async (_req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ data: reviews });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.review.delete({ where: { id } });
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};
