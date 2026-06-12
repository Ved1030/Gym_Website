import { Request, Response } from 'express';

const testimonials: Array<{ id: string; name: string; rating: number; text: string; image?: string; isActive: boolean; createdAt: Date }> = [];

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const { name, rating, text, image } = req.body;
    const testimonial = { id: String(Date.now()), name, rating, text, image, isActive: true, createdAt: new Date() };
    testimonials.push(testimonial);
    res.status(201).json({ message: 'Testimonial created', data: testimonial });
  } catch (error) {
    console.error('Testimonial error:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
};

export const getTestimonials = async (_req: Request, res: Response) => {
  try {
    const active = testimonials.filter((t) => t.isActive).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    res.json({ data: active });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idx = testimonials.findIndex((t) => t.id === id);
    if (idx !== -1) testimonials.splice(idx, 1);
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};