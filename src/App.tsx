import React from 'react';
import { motion } from 'framer-motion';
import Hero3D from './components/Hero3D';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import WhatsAppChat from './components/WhatsAppChat';

function App() {
  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-cyan-900/20 pointer-events-none" />
      
      <Navigation />
      
      <div id="chatbot">
  <div id="chat-header">🤖 Warya ChatBot</div>
  <div id="chat-box"></div>
  <input type="text" id="user-input" placeholder="Apna sawal likhein..." />
</div>
      
      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Hero3D />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </motion.div>
      </main>
      
      <WhatsAppChat />
    </div>
  );
}

export default App;
