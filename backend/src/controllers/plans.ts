import { Request, Response } from 'express';

interface Plan {
  id: string; name: string; price: number; duration: string; features: string[]; isActive: boolean; order: number;
}
const plans: Plan[] = [
  { id: 'starter', name: 'Starter', price: 999, duration: '1 month', features: ['Gym access', 'Cardio'], isActive: true, order: 1 },
  { id: 'premium', name: 'Premium', price: 1999, duration: '3 months', features: ['Gym access', 'Cardio', 'Personal training'], isActive: true, order: 2 },
  { id: 'elite', name: 'Elite', price: 3999, duration: '12 months', features: ['Gym access', 'Cardio', 'Personal training', 'Steam room'], isActive: true, order: 3 },
];

export const getPlans = async (_req: Request, res: Response) => {
  try {
    res.json({ data: plans.filter((p) => p.isActive).sort((a, b) => a.order - b.order) });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
};

export const createPlan = async (req: Request, res: Response) => {
  try {
    const plan = { id: String(Date.now()), ...req.body };
    plans.push(plan);
    res.status(201).json({ message: 'Plan created', data: plan });
  } catch (error) {
    console.error('Create plan error:', error);
    res.status(500).json({ error: 'Failed to create plan' });
  }
};

export const updatePlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idx = plans.findIndex((p) => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Plan not found' });
    plans[idx] = { ...plans[idx], ...req.body };
    res.json({ message: 'Plan updated', data: plans[idx] });
  } catch (error) {
    console.error('Update plan error:', error);
    res.status(500).json({ error: 'Failed to update plan' });
  }
};

export const deletePlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idx = plans.findIndex((p) => p.id === id);
    if (idx !== -1) plans.splice(idx, 1);
    res.json({ message: 'Plan deleted' });
  } catch (error) {
    console.error('Delete plan error:', error);
    res.status(500).json({ error: 'Failed to delete plan' });
  }
};