import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Award, Clock } from 'lucide-react';

const Hero = () => {
  const stats = [
    { icon: <Star className="text-yellow-500" size={20} />, label: '4.5 Rating', value: '103+ Reviews' },
    { icon: <Users className="text-red-500" size={20} />, label: 'Active Members', value: '5000+' },
    { icon: <Award className="text-blue-500" size={20} />, label: 'Experience', value: '10+ Years' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070"
          alt="Gym Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
      </div>

      <div className="relative z-10 max-w-3xl ml-auto mr-4 md:mr-8 text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tighter font-serif">
            TRANSFORM YOUR <span className="text-red-600">BODY</span>.<br />
            UNLOCK YOUR <span className="text-red-600">POTENTIAL</span>.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light">
            Mumbai's Premium Fitness Experience in Ghatkopar East. 
            Elite equipment, expert coaching, and a community that drives results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start mb-16">
            <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
              START FREE TRIAL
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full text-lg font-bold transition-all">
              VIEW MEMBERSHIPS
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl flex items-center gap-4 justify-start"
              >
                <div className="p-3 bg-white/5 rounded-full">{stat.icon}</div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-red-600 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;