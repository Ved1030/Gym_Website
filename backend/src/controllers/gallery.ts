import { Request, Response } from 'express';

interface Transformation {
  id: string; title: string; image: string; description?: string; isActive: boolean; order: number;
}
const transformations: Transformation[] = [];

export const getGallery = async (_req: Request, res: Response) => {
  try {
    res.json({ data: transformations.filter((t) => t.isActive).sort((a, b) => a.order - b.order) });
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
};

export const createTransformation = async (req: Request, res: Response) => {
  try {
    const transformation = { id: String(Date.now()), ...req.body };
    transformations.push(transformation);
    res.status(201).json({ message: 'Transformation created', data: transformation });
  } catch (error) {
    console.error('Create transformation error:', error);
    res.status(500).json({ error: 'Failed to create transformation' });
  }
};

export const updateTransformation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idx = transformations.findIndex((t) => t.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Transformation not found' });
    transformations[idx] = { ...transformations[idx], ...req.body };
    res.json({ message: 'Transformation updated', data: transformations[idx] });
  } catch (error) {
    console.error('Update transformation error:', error);
    res.status(500).json({ error: 'Failed to update transformation' });
  }
};

export const deleteTransformation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idx = transformations.findIndex((t) => t.id === id);
    if (idx !== -1) transformations.splice(idx, 1);
    res.json({ message: 'Transformation deleted' });
  } catch (error) {
    console.error('Delete transformation error:', error);
    res.status(500).json({ error: 'Failed to delete transformation' });
  }
};