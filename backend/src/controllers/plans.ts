import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const getPlans = async (_req: Request, res: Response) => {
  try {
    const plans = await prisma.membershipPlan.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    res.json({ data: plans });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
};

export const createPlan = async (req: Request, res: Response) => {
  try {
    const plan = await prisma.membershipPlan.create({ data: req.body });
    res.status(201).json({ message: 'Plan created', data: plan });
  } catch (error) {
    console.error('Create plan error:', error);
    res.status(500).json({ error: 'Failed to create plan' });
  }
};

export const updatePlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const plan = await prisma.membershipPlan.update({
      where: { id },
      data: req.body,
    });
    res.json({ message: 'Plan updated', data: plan });
  } catch (error) {
    console.error('Update plan error:', error);
    res.status(500).json({ error: 'Failed to update plan' });
  }
};

export const deletePlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.membershipPlan.delete({ where: { id } });
    res.json({ message: 'Plan deleted' });
  } catch (error) {
    console.error('Delete plan error:', error);
    res.status(500).json({ error: 'Failed to delete plan' });
  }
};
