import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TransformationSlider from '../components/TransformationSlider';
import BMICalculator from '../components/BMICalculator';
import GoalFinder from '../components/GoalFinder';
import { Check, MessageCircle, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import FacilitiesCarousel from '../components/FacilitiesCarousel';

const Home = () => {
  const plans = [
    { name: 'Monthly', price: '₹2,999', features: ['Full Gym Access', 'Locker Facility', 'General Coaching', 'Steam Access'] },
    { name: 'Quarterly', price: '₹7,499', features: ['Full Gym Access', 'Locker Facility', 'General Coaching', 'Steam Access', '1 PT Session'], popular: true },
    { name: 'Yearly', price: '₹24,999', features: ['Full Gym Access', 'Locker Facility', 'General Coaching', 'Steam Access', '5 PT Sessions', 'Diet Plan'] },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      
      <Hero />

      <FacilitiesCarousel />

      <TransformationSlider />

      <GoalFinder />

      <BMICalculator />

      {/* Pricing */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="pricing">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">MEMBERSHIP PLANS</h2>
          <p className="text-gray-400">Choose the plan that fits your fitness journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div 
              key={i}
              className={`relative p-8 rounded-[2.5rem] border ${plan.popular ? 'border-red-600 bg-red-600/5' : 'border-white/10 bg-white/5'} flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-8">{plan.price}<span className="text-sm text-gray-500 font-normal">/period</span></div>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-gray-300">
                    <Check size={18} className="text-red-500" /> {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.popular ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                JOIN NOW
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold font-serif mb-6">GET IN TOUCH</h2>
            <p className="text-gray-400 mb-10">Have questions? Our team is here to help you start your transformation.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center text-red-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="font-bold">Location</div>
                  <div className="text-gray-400">Ghatkopar East, Mumbai, Maharashtra</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center text-red-500">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="font-bold">Call Us</div>
                  <div className="text-gray-400">+91 98765 43210</div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input type="text" placeholder="Name" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" />
                <input type="tel" placeholder="Phone" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <input type="email" placeholder="Email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" />
              <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 text-gray-400">
                <option>Select Goal</option>
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
              </select>
              <textarea placeholder="Message" rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"></textarea>
              <button className="w-full bg-red-600 py-4 rounded-xl font-bold hover:bg-red-700 transition-all">SEND INQUIRY</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-xl font-bold font-serif">GLORIOUS <span className="text-red-600">FITNESS</span></div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">By Prashant Wadekar</div>
          </div>
          <div className="text-gray-500 text-sm">
            © 2026 Glorious Fitness. All rights reserved.
          </div>
          <div className="flex gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-[32px] right-[24px] w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 animate-bounce"
      >
        <MessageCircle size={32} className="text-white" />
      </a>
    </div>
  );
};

export default Home;