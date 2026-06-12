import { Request, Response } from 'express';

interface Trainer {
  id: string; name: string; specialty: string; bio?: string; image?: string; order: number;
}
const trainers: Trainer[] = [
  { id: 'trainer-1', name: 'Rajesh Kumar', specialty: 'Strength Training', bio: '10+ years experience', order: 1 },
  { id: 'trainer-2', name: 'Priya Sharma', specialty: 'Yoga & Flexibility', bio: 'Certified yoga instructor', order: 2 },
];

export const getTrainers = async (_req: Request, res: Response) => {
  try {
    res.json({ data: trainers.sort((a, b) => a.order - b.order) });
  } catch (error) {
    console.error('Get trainers error:', error);
    res.status(500).json({ error: 'Failed to fetch trainers' });
  }
};

export const createTrainer = async (req: Request, res: Response) => {
  try {
    const trainer = { id: String(Date.now()), ...req.body };
    trainers.push(trainer);
    res.status(201).json({ message: 'Trainer created', data: trainer });
  } catch (error) {
    console.error('Create trainer error:', error);
    res.status(500).json({ error: 'Failed to create trainer' });
  }
};

export const updateTrainer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idx = trainers.findIndex((t) => t.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Trainer not found' });
    trainers[idx] = { ...trainers[idx], ...req.body };
    res.json({ message: 'Trainer updated', data: trainers[idx] });
  } catch (error) {
    console.error('Update trainer error:', error);
    res.status(500).json({ error: 'Failed to update trainer' });
  }
};

export const deleteTrainer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idx = trainers.findIndex((t) => t.id === id);
    if (idx !== -1) trainers.splice(idx, 1);
    res.json({ message: 'Trainer deleted' });
  } catch (error) {
    console.error('Delete trainer error:', error);
    res.status(500).json({ error: 'Failed to delete trainer' });
  }
};