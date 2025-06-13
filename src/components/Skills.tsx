import React, { useState } from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 95, color: 'from-blue-500 to-blue-600' },
      { name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-700' },
      { name: 'Next.js', level: 88, color: 'from-gray-700 to-gray-800' },
      { name: 'Tailwind CSS', level: 92, color: 'from-cyan-500 to-cyan-600' },
      { name: 'Bootstrap', level: 75, color: 'from-green-500 to-green-600' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 85, color: 'from-green-600 to-green-700' },
      { name: 'Python', level: 80, color: 'from-yellow-500 to-yellow-600' },
      { name: 'PostgreSQL', level: 82, color: 'from-blue-700 to-blue-800' },
      { name: 'Django', level: 78, color: 'from-green-700 to-green-800' },
      { name: 'GraphQL', level: 73, color: 'from-pink-500 to-pink-600' },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', level: 90, color: 'from-orange-500 to-orange-600' },
      { name: 'Docker', level: 75, color: 'from-blue-500 to-blue-600' },
      { name: 'AWS', level: 70, color: 'from-orange-600 to-orange-700' },
      { name: 'Figma', level: 85, color: 'from-purple-500 to-purple-600' },
      { name: 'Webpack', level: 80, color: 'from-blue-600 to-blue-700' },
    ],
  },
];

function SkillCard({ skill, index }: { skill: any; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative h-32 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="absolute inset-0 w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 flex flex-col justify-center items-center backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <h4 className="text-lg font-semibold text-white mb-2">{skill.name}</h4>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true }}
            />
          </div>
          <span className="text-sm text-gray-400 mt-2">{skill.level}%</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-md rounded-xl border border-blue-400/30 p-4 flex flex-col justify-center items-center backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h4 className="text-lg font-semibold text-blue-400 mb-2">{skill.name}</h4>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{skill.level}%</div>
            <div className="text-sm text-gray-300">Proficiency</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Hover over the cards to see detailed proficiency levels
          </p>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard key={skill.name} skill={skill} index={skillIndex} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}