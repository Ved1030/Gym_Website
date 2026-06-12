import { Request, Response } from 'express';

const inquiries: Array<{ id: string; name: string; email: string; phone?: string; message: string; createdAt: Date }> = [];

export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;
    const inquiry = { id: String(Date.now()), name, email, phone, message, createdAt: new Date() };
    inquiries.push(inquiry);
    res.status(201).json({ message: 'Inquiry submitted successfully', data: inquiry });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
};

export const getContacts = async (_req: Request, res: Response) => {
  try {
    res.json({ data: inquiries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
};