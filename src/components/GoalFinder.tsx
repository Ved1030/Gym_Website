import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

const GoalFinder = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    goal: '',
    experience: '',
    age: ''
  });

  const steps = [
    {
      id: 1,
      title: "What is your primary goal?",
      options: ["Weight Loss", "Muscle Gain", "Strength", "Athletic Performance"]
    },
    {
      id: 2,
      title: "What is your experience level?",
      options: ["Beginner", "Intermediate", "Advanced"]
    },
    {
      id: 3,
      title: "What is your age group?",
      options: ["Under 20", "20 - 35", "35 - 50", "50+"]
    }
  ];

  const handleSelect = (value: string) => {
    const key = step === 1 ? 'goal' : step === 2 ? 'experience' : 'age';
    setSelections({ ...selections, [key]: value });
    if (step < 3) setStep(step + 1);
    else setStep(4);
  };

  return (
    <section className="py-24 bg-black border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 font-serif">FITNESS GOAL FINDER</h2>
          <p className="text-gray-400">Answer 3 quick questions to get your personalized training recommendation.</p>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step <= 3 ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-red-500 font-bold">Step {step} of 3</span>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1.5 w-8 rounded-full ${i <= step ? 'bg-red-600' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white">{steps[step-1].title}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {steps[step-1].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className="p-6 rounded-2xl border border-white/10 bg-white/5 text-left text-white hover:border-red-500 hover:bg-red-500/10 transition-all group flex justify-between items-center"
                    >
                      <span className="font-medium">{opt}</span>
                      <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500" size={20} />
                    </button>
                  ))}
                </div>

                {step > 1 && (
                  <button 
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={18} /> Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-green-500" size={40} />
                </div>
                <h3 className="text-3xl font-bold text-white">We've Found Your Perfect Plan!</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Based on your goal of <span className="text-white font-bold">{selections.goal}</span>, we recommend our 
                  <span className="text-red-500 font-bold"> Elite Transformation Program</span>.
                </p>
                
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 max-w-md mx-auto text-left">
                  <h4 className="text-white font-bold mb-2">What's included:</h4>
                  <ul className="text-gray-400 space-y-2 text-sm">
                    <li>• 5x Personal Training Sessions/Week</li>
                    <li>• Custom Macro-based Diet Plan</li>
                    <li>• Monthly Body Composition Analysis</li>
                    <li>• 24/7 WhatsApp Support</li>
                  </ul>
                </div>

                <button className="bg-red-600 text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                  CLAIM YOUR FREE TRIAL
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default GoalFinder;