import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TransformationSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const container = e.currentTarget.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - container.left) / container.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">REAL RESULTS</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Witness the incredible journeys of our members. Drag the slider to see the transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className="relative aspect-[4/5] rounded-3xl overflow-hidden cursor-ew-resize select-none group"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
          >
            {/* After Image */}
            <img 
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=1000" 
              alt="After"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Before Image Overlay */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000" 
                alt="Before"
                className="absolute inset-0 w-full h-full object-cover grayscale"
                style={{ width: `${10000 / sliderPos}%` }}
              />
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-red-600 z-10"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-xl">
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-white/50 rounded-full" />
                  <div className="w-1 h-4 bg-white/50 rounded-full" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm font-bold">BEFORE</div>
            <div className="absolute bottom-6 right-6 bg-red-600 px-4 py-2 rounded-lg text-white text-sm font-bold">AFTER</div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-4">Rahul's 12-Week Journey</h3>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider mb-1">Weight Lost</div>
                  <div className="text-3xl font-bold text-red-500">14.5 KG</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider mb-1">Time Taken</div>
                  <div className="text-3xl font-bold text-red-500">3 Months</div>
                </div>
              </div>
              <p className="text-gray-300 italic leading-relaxed">
                "Joining Glorious Fitness was the best decision of my life. Prashant sir's guidance and the premium environment kept me motivated every single day. The transformation isn't just physical, it's mental."
              </p>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-colors">
                START YOUR JOURNEY
              </button>
              <button className="px-6 border border-white/20 rounded-2xl text-white hover:bg-white/5 transition-colors">
                NEXT STORY
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSlider;