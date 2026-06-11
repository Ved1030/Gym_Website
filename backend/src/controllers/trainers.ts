import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const getTrainers = async (_req: Request, res: Response) => {
  try {
    const trainers = await prisma.trainer.findMany({
      orderBy: { order: 'asc' },
    });
    res.json({ data: trainers });
  } catch (error) {
    console.error('Get trainers error:', error);
    res.status(500).json({ error: 'Failed to fetch trainers' });
  }
};

export const createTrainer = async (req: Request, res: Response) => {
  try {
    const trainer = await prisma.trainer.create({ data: req.body });
    res.status(201).json({ message: 'Trainer created', data: trainer });
  } catch (error) {
    console.error('Create trainer error:', error);
    res.status(500).json({ error: 'Failed to create trainer' });
  }
};

export const updateTrainer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trainer = await prisma.trainer.update({
      where: { id },
      data: req.body,
    });
    res.json({ message: 'Trainer updated', data: trainer });
  } catch (error) {
    console.error('Update trainer error:', error);
    res.status(500).json({ error: 'Failed to update trainer' });
  }
};

export const deleteTrainer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.trainer.delete({ where: { id } });
    res.json({ message: 'Trainer deleted' });
  } catch (error) {
    console.error('Delete trainer error:', error);
    res.status(500).json({ error: 'Failed to delete trainer' });
  }
};
