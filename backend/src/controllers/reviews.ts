import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const getReviews = async (_req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    const stats = await prisma.review.aggregate({
      _avg: { rating: true },
      _count: true,
    });
    res.json({
      data: reviews,
      stats: {
        averageRating: stats._avg.rating || 0,
        totalReviews: stats._count,
      },
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};
