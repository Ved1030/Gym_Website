import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@gymmantrafitness.in' },
    update: {},
    create: {
      email: 'admin@gymmantrafitness.in',
      password: adminPassword,
name: 'Head Coach',
      role: 'ADMIN',
    },
  });

  await prisma.membershipPlan.deleteMany();
  const plans = [
    { name: 'Starter', price: 1999, duration: 'month', description: 'Perfect for beginners', features: ['Gym Access (6 AM - 11 PM)', 'Basic Equipment', 'Locker Access', 'Fitness Assessment'], isPopular: false, order: 1 },
    { name: 'Pro', price: 3999, duration: 'month', description: 'Most popular choice', features: ['Full Day Access', 'All Equipment', 'Functional Training', '1 PT Session/Week', 'Nutrition Guidance', 'Locker & Towel'], isPopular: true, order: 2 },
    { name: 'Elite', price: 6999, duration: 'month', description: 'Ultimate fitness experience', features: ['24/7 Access', 'All Equipment & Classes', 'Personal Training', '4 PT Sessions/Week', 'Custom Meal Plan', 'Priority Support', 'VIP Locker Room'], isPopular: false, order: 3 },
  ];
  await prisma.membershipPlan.createMany({ data: plans });

  await prisma.trainer.deleteMany();
  const trainers = [
    { name: 'Head Coach', experience: 15, specialization: 'Strength & Conditioning', certifications: 'NSCA-CSCS, ACE-CPT', isFounder: true, order: 1 },
    { name: 'Vikram Joshi', experience: 10, specialization: 'Functional Training', certifications: 'ACE-CPT, NASM-CES', isFounder: false, order: 2 },
    { name: 'Neha Singh', experience: 8, specialization: 'Yoga & Pilates', certifications: 'RYT-500, ACE-GFI', isFounder: false, order: 3 },
    { name: 'Rohan Desai', experience: 7, specialization: 'Sports Nutrition', certifications: 'ISSN-SNS, ACE-CPT', isFounder: false, order: 4 },
  ];
  await prisma.trainer.createMany({ data: trainers });

  await prisma.review.deleteMany();
  const reviews = [
    { name: 'Rahul Sharma', rating: 5, text: 'Great equipment, clean space, and a motivating atmosphere. The trainers are extremely supportive and knowledgeable.' },
    { name: 'Priya Patel', rating: 5, text: 'Excellent gym with top-notch equipment and a dedicated ladies section. Highly recommended.' },
    { name: 'Amit Verma', rating: 5, text: 'One of the best fitness centers in Ghatkopar. Great environment for both beginners and serious fitness enthusiasts.' },
  ];
  await prisma.review.createMany({ data: reviews });

  console.log('Seed data created successfully');
  console.log('Admin login: admin@gymmantrafitness.in / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
