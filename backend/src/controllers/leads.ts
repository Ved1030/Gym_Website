import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, goal } = req.body;
    const lead = await prisma.lead.create({
      data: { name, email, phone, goal, source: 'website' },
    });
    res.status(201).json({ message: 'Lead captured successfully', data: lead });
  } catch (error) {
    console.error('Lead error:', error);
    res.status(500).json({ error: 'Failed to capture lead' });
  }
};

export const getLeads = async (_req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ data: leads });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
};

export const exportLeads = async (_req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
    const csv = [
      'Name,Email,Phone,Goal,Source,Status,CreatedAt',
      ...leads.map((l) =>
        `"${l.name}","${l.email}","${l.phone}","${l.goal || ''}","${l.source}","${l.status}","${l.createdAt.toISOString()}"`
      ),
    ].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(csv);
  } catch (error) {
    console.error('Export leads error:', error);
    res.status(500).json({ error: 'Failed to export leads' });
  }
};
