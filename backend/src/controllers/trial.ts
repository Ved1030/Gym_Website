import { Request, Response } from 'express';

const trials: Array<{ id: string; name: string; email: string; phone: string; goal?: string; source: string; createdAt: Date }> = [];

export const createTrial = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, goal } = req.body;
    const lead = { id: String(Date.now()), name, email, phone, goal, source: 'trial', createdAt: new Date() };
    trials.push(lead);
    res.status(201).json({ message: 'Trial registered successfully', data: lead });
  } catch (error) {
    console.error('Trial error:', error);
    res.status(500).json({ error: 'Failed to register trial' });
  }
};