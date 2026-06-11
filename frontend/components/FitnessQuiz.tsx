'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Answers = {
  goal: string;
  experience: string;
  age: string;
  gender: string;
};

const steps = [
  { id: 'goal', question: 'What is your primary fitness goal?', options: ['Weight Loss', 'Muscle Building', 'General Fitness', 'Flexibility'] },
  { id: 'experience', question: 'What is your fitness experience?', options: ['Beginner', 'Intermediate', 'Advanced'] },
  { id: 'age', question: 'What is your age group?', options: ['Under 18', '18-25', '26-35', '36-45', '46+'] },
  { id: 'gender', question: 'What is your gender?', options: ['Male', 'Female', 'Prefer not to say'] },
];

const recommendations: Record<string, Record<string, string>> = {
  'Weight Loss': {
    Beginner: 'Start with our beginner-friendly weight loss program combining cardio and strength training 4x/week. Try our Free Trial!',
    Intermediate: 'Advance with HIIT training and our specialized fat-loss program. Consider our Pro membership.',
    Advanced: 'Fine-tune with our Elite program featuring personalized coaching and advanced techniques.',
  },
  'Muscle Building': {
    Beginner: 'Begin with foundational compound movements and progressive overload. Our trainers will guide you.',
    Intermediate: 'Optimize with split training routines and periodization. Pro membership recommended.',
    Advanced: 'Push limits with advanced techniques. Our Elite program offers the ultimate muscle-building environment.',
  },
  'General Fitness': {
    Beginner: 'Our balanced approach combines cardio, strength, and flexibility. Start with our Free Trial!',
    Intermediate: 'Maintain and challenge yourself with diverse training protocols. Pro plan is ideal for you.',
    Advanced: 'Cross-train and explore new disciplines. Elite membership gives you full access to everything.',
  },
  'Flexibility': {
    Beginner: 'Begin with our yoga and stretching fundamentals. Great for all ages and fitness levels.',
    Intermediate: 'Deepen your practice with advanced yoga and mobility work. Join our specialized sessions.',
    Advanced: 'Master advanced flexibility techniques. Our trainers can help you reach new levels.',
  },
};

export default function FitnessQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ goal: '', experience: '', age: '', gender: '' });
  const [showResult, setShowResult] = useState(false);

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const select = (value: string) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  const next = () => {
    if (isLast) {
      setShowResult(true);
    } else {
      setStep((p) => p + 1);
    }
  };

  const prev = () => setStep((p) => p - 1);

  const reset = () => {
    setStep(0);
    setAnswers({ goal: '', experience: '', age: '', gender: '' });
    setShowResult(false);
  };

  const currentAnswer = answers[current.id as keyof Answers];

  const recommendation = answers.goal && answers.experience
    ? recommendations[answers.goal]?.[answers.experience] || 'Visit us for a personalized assessment!'
    : '';

  return (
    <section id="quiz" className="py-20 lg:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Quiz
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Find Your <span className="text-gradient">Perfect Plan</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Answer a few questions and we&apos;ll recommend the best fitness path for you.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="glass rounded-2xl p-6 md:p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-muted-foreground">
                    Step {step + 1} of {steps.length}
                  </span>
                  <div className="flex gap-1">
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i <= step ? 'bg-primary w-6' : 'bg-muted w-3'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4">{current.question}</h3>

                <div className="space-y-2">
                  {current.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => select(option)}
                      className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                        currentAnswer === option
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/30 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{option}</span>
                        {currentAnswer === option && <Check className="h-4 w-4 text-primary" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="ghost"
                    onClick={prev}
                    disabled={step === 0}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button
                    onClick={next}
                    disabled={!currentAnswer}
                    className="gap-2"
                  >
                    {isLast ? 'Get Results' : 'Next'}{' '}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-6 md:p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Your Recommendation</h3>
                <p className="text-muted-foreground mb-6">{recommendation}</p>
                <div className="space-y-2 text-sm text-left glass rounded-xl p-4 mb-6">
                  <p><span className="text-muted-foreground">Goal:</span> <span className="text-foreground">{answers.goal}</span></p>
                  <p><span className="text-muted-foreground">Experience:</span> <span className="text-foreground">{answers.experience}</span></p>
                  <p><span className="text-muted-foreground">Age:</span> <span className="text-foreground">{answers.age}</span></p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#trial" className="flex-1">
                    <Button className="w-full gap-2">
                      Start Free Trial <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                  <Button variant="outline" onClick={reset} className="flex-1">
                    Retake Quiz
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
