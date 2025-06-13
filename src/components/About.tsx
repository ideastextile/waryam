import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap, Globe } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'Building robust applications with modern technologies and best practices.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Creating beautiful, intuitive interfaces that users love to interact with.',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Ensuring lightning-fast load times and smooth user experiences.',
  },
  {
    icon: Globe,
    title: 'Web Technologies',
    description: 'Staying current with the latest web standards and emerging technologies.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4 text-white">Passionate Developer</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                I'm a creative developer with a passion for building innovative digital experiences. 
                With expertise in modern web technologies, I transform ideas into beautiful, 
                functional applications that make a real impact.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My approach combines technical excellence with creative design thinking, 
                ensuring every project not only works flawlessly but also provides an 
                exceptional user experience.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.3)' }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}