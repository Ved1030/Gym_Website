import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const trialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  goal: z.string().optional(),
});

export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  goal: z.string().optional(),
  source: z.string().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  rating: z.number().min(1).max(5),
  text: z.string().min(10, 'Testimonial must be at least 10 characters'),
  image: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type TrialInput = z.infer<typeof trialSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
