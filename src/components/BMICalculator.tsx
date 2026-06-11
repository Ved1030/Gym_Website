import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    if (weight && height) {
      const h = parseFloat(height) / 100;
      const w = parseFloat(weight);
      const result = w / (h * h);
      setBmi(parseFloat(result.toFixed(1)));
    }
  };

  const getCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-400', advice: 'Focus on muscle gain and nutrition.' };
    if (val < 25) return { label: 'Normal', color: 'text-green-400', advice: 'Maintain your fitness with strength training.' };
    if (val < 30) return { label: 'Overweight', color: 'text-yellow-400', advice: 'Recommended: High-intensity cardio & strength.' };
    return { label: 'Obese', color: 'text-red-500', advice: 'Recommended: Personalized transformation program.' };
  };

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] -mr-32 -mt-32" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4 font-serif">BMI CALCULATOR</h2>
              <p className="text-gray-400 mb-8">
                Quickly assess your body mass index and get a recommended fitness path.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    placeholder="e.g. 75"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    placeholder="e.g. 175"
                  />
                </div>
                <button
                  onClick={calculateBMI}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition-all"
                >
                  CALCULATE NOW
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              {bmi ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="text-gray-400 uppercase tracking-widest text-sm">Your BMI Score</div>
                  <div className="text-7xl font-bold text-white">{bmi}</div>
                  <div className={`text-2xl font-bold ${getCategory(bmi).color}`}>
                    {getCategory(bmi).label}
                  </div>
                  <p className="text-gray-400 max-w-[250px] mx-auto">
                    {getCategory(bmi).advice}
                  </p>
                  <button className="mt-6 text-red-500 font-bold hover:underline">
                    Get Custom Diet Plan →
                  </button>
                </motion.div>
              ) : (
                <div className="text-gray-600 flex flex-col items-center">
                  <div className="w-32 h-32 border-4 border-dashed border-gray-800 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl">?</span>
                  </div>
                  <p>Enter your details to see results</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;