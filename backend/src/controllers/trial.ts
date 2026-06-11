import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const createTrial = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, goal } = req.body;
    const lead = await prisma.lead.create({
      data: { name, email, phone, goal, source: 'trial' },
    });
    res.status(201).json({ message: 'Trial registered successfully', data: lead });
  } catch (error) {
    console.error('Trial error:', error);
    res.status(500).json({ error: 'Failed to register trial' });
  }
};
