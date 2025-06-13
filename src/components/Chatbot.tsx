import React, { useState, useRef, useEffect } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Assalamu Alaikum! Kaise madad kar sakta hoon?" },
  ]);
  const [input, setInput] = useState<string>("");
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const responses: Record<string, string> = {
    hello: "Wa Alaikum Salam! Main Warya Chatbot hoon.",
    price: "Hamari services ka price depend karta hai product par.",
    contact: "Aap humein WhatsApp ya Contact form se rabta kar sakte hain.",
    bye: "Allah Hafiz! JazakAllah.",
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const lower = input.toLowerCase();
    let reply =
      "Maaf kijiye, samajh nahi aaya. Zyada wazahat se poochein ya 'contact' likhein.";

    for (let key in responses) {
      if (lower.includes(key)) {
        reply = responses[key];
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 500);

    setInput("");
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={styles.chatbot}>
      <div style={styles.header}>🤖 Warya ChatBot</div>
      <div style={styles.chatBox} ref={chatBoxRef}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#dcf8c6" : "#f1f0f0",
            }}
          >
            <strong>{msg.sender === "user" ? "Aap" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        style={styles.input}
        placeholder="Apna sawal likhein..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
    </div>
  );
};

// ✅ INLINE CSS styles — required!
const styles: { [key: string]: React.CSSProperties } = {
  chatbot: {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: 320,
    borderRadius: 15,
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "sans-serif",
    zIndex: 9999,
  },
  header: {
    background: "#4CAF50",
    color: "white",
    padding: "10px",
    fontWeight: "bold",
    textAlign: "center",
  },
  chatBox: {
    height: 250,
    overflowY: "auto",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  message: {
    padding: "8px 12px",
    borderRadius: 10,
    maxWidth: "80%",
  },
  input: {
    border: "none",
    borderTop: "1px solid #ccc",
    padding: "12px",
    fontSize: 14,
    outline: "none",
  },
};

export default Chatbot;
