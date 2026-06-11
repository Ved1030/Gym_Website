import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;
    const inquiry = await prisma.contactInquiry.create({
      data: { name, email, phone, message },
    });
    res.status(201).json({ message: 'Inquiry submitted successfully', data: inquiry });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
};

export const getContacts = async (_req: Request, res: Response) => {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ data: inquiries });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
};
