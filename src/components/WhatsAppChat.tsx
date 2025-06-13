import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Updated WhatsApp number to Pakistani format
      const whatsappUrl = `https://wa.me/923042828783?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setMessage('');
      setIsOpen(false);
    }
  };

  const quickMessages = [
    "Hi! I'd like to discuss a project.",
    "Can we schedule a consultation?",
    "I'm interested in your web development services.",
    "What's your availability for a new project?",
    "I need help with my website.",
  ];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center text-white transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={{ 
          boxShadow: isOpen ? '0 0 0 0 rgba(34, 197, 94, 0.7)' : '0 0 0 10px rgba(34, 197, 94, 0.7)',
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: isOpen ? 0 : Infinity,
            repeatType: "reverse"
          }
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-green-500 px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">WhatsApp Chat</h3>
                  <p className="text-green-100 text-xs">Available for project discussions</p>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-3 bg-gray-50 max-h-64 overflow-y-auto">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-gray-700 text-sm">
                    👋 Hi! I'm available to discuss your web development projects. 
                    How can I help you today?
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-gray-500 px-2">Quick messages:</p>
                  {quickMessages.map((msg, index) => (
                    <motion.button
                      key={index}
                      className="block w-full text-left bg-blue-50 hover:bg-blue-100 rounded-lg p-2 text-sm text-gray-700 transition-colors duration-200"
                      onClick={() => setMessage(msg)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {msg}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  This will open WhatsApp to continue the conversation
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}