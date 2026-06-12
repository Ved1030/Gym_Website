import { Request, Response } from 'express';

const leads: Array<{ id: string; name: string; email: string; phone: string; goal?: string; source: string; status: string; createdAt: Date }> = [];

export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, goal } = req.body;
    const lead = { id: String(Date.now()), name, email, phone, goal, source: 'website', status: 'NEW', createdAt: new Date() };
    leads.push(lead);
    res.status(201).json({ message: 'Lead captured successfully', data: lead });
  } catch (error) {
    console.error('Lead error:', error);
    res.status(500).json({ error: 'Failed to capture lead' });
  }
};

export const getLeads = async (_req: Request, res: Response) => {
  try {
    res.json({ data: leads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
};

export const exportLeads = async (_req: Request, res: Response) => {
  try {
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