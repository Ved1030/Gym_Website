import { Request, Response } from 'express';

const reviews: Array<{ id: string; name: string; rating: number; text: string; isActive: boolean; createdAt: Date }> = [];

export const getReviews = async (_req: Request, res: Response) => {
  try {
    const active = reviews.filter((r) => r.isActive).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 10);
    const total = active.length;
    const avg = total > 0 ? active.reduce((s, r) => s + r.rating, 0) / total : 0;
    res.json({
      data: active,
      stats: { averageRating: avg, totalReviews: total },
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};