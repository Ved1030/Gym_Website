'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type BMICategory = {
  category: string;
  color: string;
  recommendation: string;
};

const getBMICategory = (bmi: number): BMICategory => {
  if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-400', recommendation: 'Focus on nutrient-dense foods and strength training to build healthy mass.' };
  if (bmi < 25) return { category: 'Normal', color: 'text-green-400', recommendation: 'Great job! Maintain with a balanced diet and regular exercise.' };
  if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-400', recommendation: 'Combine cardio with strength training and monitor your calorie intake.' };
  return { category: 'Obese', color: 'text-yellow-400', recommendation: 'Consult our trainers for a personalized fitness and nutrition plan.' };
};

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<BMICategory | null>(null);

  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmiValue = w / ((h / 100) * (h / 100));
      setBmi(Math.round(bmiValue * 10) / 10);
      setCategory(getBMICategory(bmiValue));
    }
  };

  return (
    <section id="bmi" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            BMI Calculator
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Know Your <span className="text-gradient">BMI</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Calculate your Body Mass Index to understand where you stand.
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Height (cm)</label>
                <Input
                  type="number"
                  placeholder="e.g., 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Weight (kg)</label>
                <Input
                  type="number"
                  placeholder="e.g., 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <Button onClick={calculate} className="w-full gap-2" size="lg">
                <Activity className="h-4 w-4" />
                Calculate BMI
              </Button>
            </div>

            {bmi !== null && category && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 glass rounded-xl text-center"
              >
                <div className="text-4xl font-bold text-foreground">{bmi}</div>
                <div className={`text-lg font-semibold mt-1 ${category.color}`}>
                  {category.category}
                </div>
                <p className="text-sm text-muted-foreground mt-3">{category.recommendation}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
