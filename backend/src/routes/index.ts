import { Router } from 'express';
import { createContact, getContacts } from '../controllers/contact';
import { createTrial } from '../controllers/trial';
import { createLead, getLeads, exportLeads } from '../controllers/leads';
import { createTestimonial, getTestimonials, deleteTestimonial } from '../controllers/testimonials';
import { getPlans, createPlan, updatePlan, deletePlan } from '../controllers/plans';
import { getTrainers, createTrainer, updateTrainer, deleteTrainer } from '../controllers/trainers';
import { getGallery, createTransformation, updateTransformation, deleteTransformation } from '../controllers/gallery';
import { getReviews } from '../controllers/reviews';
import { login, register } from '../controllers/auth';
import { chat, getChatHistory } from '../controllers/chat';
import { validate } from '../middleware/validate';
import { authenticate, requireAdmin } from '../middleware/auth';
import {
  contactSchema,
  trialSchema,
  leadSchema,
  testimonialSchema,
  loginSchema,
} from '../utils/validation';

const router = Router();

router.post('/api/contact', validate(contactSchema), createContact);
router.post('/api/trial', validate(trialSchema), createTrial);
router.post('/api/leads', validate(leadSchema), createLead);
router.post('/api/testimonials', validate(testimonialSchema), createTestimonial);
router.get('/api/testimonials', getTestimonials);
router.get('/api/plans', getPlans);
router.get('/api/trainers', getTrainers);
router.get('/api/gallery', getGallery);
router.get('/api/reviews', getReviews);

router.post('/api/auth/login', validate(loginSchema), login);
router.post('/api/auth/register', validate(loginSchema), register);

router.post('/api/chat', chat);
router.get('/api/chat/:sessionId', getChatHistory);

router.get('/api/admin/contacts', authenticate, requireAdmin, getContacts);
router.get('/api/admin/leads', authenticate, requireAdmin, getLeads);
router.get('/api/admin/leads/export', authenticate, requireAdmin, exportLeads);
router.delete('/api/admin/testimonials/:id', authenticate, requireAdmin, deleteTestimonial);

router.post('/api/admin/plans', authenticate, requireAdmin, createPlan);
router.put('/api/admin/plans/:id', authenticate, requireAdmin, updatePlan);
router.delete('/api/admin/plans/:id', authenticate, requireAdmin, deletePlan);

router.post('/api/admin/trainers', authenticate, requireAdmin, createTrainer);
router.put('/api/admin/trainers/:id', authenticate, requireAdmin, updateTrainer);
router.delete('/api/admin/trainers/:id', authenticate, requireAdmin, deleteTrainer);

router.post('/api/admin/gallery', authenticate, requireAdmin, createTransformation);
router.put('/api/admin/gallery/:id', authenticate, requireAdmin, updateTransformation);
router.delete('/api/admin/gallery/:id', authenticate, requireAdmin, deleteTransformation);

export default router;
