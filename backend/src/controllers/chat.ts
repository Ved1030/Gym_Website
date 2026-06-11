import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { config } from '../config';

const SYSTEM_PROMPT = `You are GloriousAI, the official AI assistant for Glorious Fitness by Prashant Wadekar in Ghatkopar East, Mumbai.

Key Information:
- Location: Ghatkopar East, Mumbai
- Founder: Prashant Wadekar (15+ years experience)
- Hours: Mon-Sat 6AM-10PM, Sun 7AM-2PM
- Contact: +91 98765 43210, info@gloriousfitness.com

Membership Plans:
- Starter: ₹1,999/month (basic access 6-10AM)
- Pro: ₹3,999/month (full access, steam room, 1 PT/week) - MOST POPULAR
- Elite: ₹6,999/month (24/7 access, 4 PT/week, custom meal plan)

Facilities: Strength Zone, Cardio Arena, Functional Training, Steam Room, Personal Training, Nutrition Guidance

Free Trial: Available! Fill the form on the website to book.

Guidelines:
- Be friendly, professional, and enthusiastic
- Keep responses concise (2-3 sentences max)
- Always encourage visitors to book a free trial
- Use emojis sparingly
- If you don't know something, be honest and offer to connect with a human
- Never make up pricing or information not provided above`;

export const chat = async (req: Request, res: Response) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: 'Message and sessionId required' });
    }

    await prisma.chatMessage.create({
      data: { sessionId, role: 'user', content: message },
    });

    const history = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: 20,
    });

    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...history.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ];

    let reply: string;
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.openaiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'OpenAI API error');
      }
      reply = data.choices[0].message.content;
    } catch {
      reply = "I'm here to help! You can ask me about our membership plans, facilities, timings, or book a free trial. For immediate assistance, please WhatsApp us at +91 98765 43210 💪";
    }

    await prisma.chatMessage.create({
      data: { sessionId, role: 'assistant', content: reply },
    });

    res.json({ reply, sessionId });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const messages = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });
    res.json({ data: messages });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};
