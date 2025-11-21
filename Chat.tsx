import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';

interface ChatProps {
  recipientName: string;
  onClose: () => void;
}

export const Chat: React.FC<ChatProps> = ({ recipientName, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'system',
      text: `Η σύνδεσή σας με τον/την ${recipientName} είναι ενεργή. Μιλήστε ελεύθερα!`,
      timestamp: new Date(),
      isSystem: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate reply after delay
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: 'them',
        text: 'Χαίρομαι πολύ που επικοινωνούμε! Πώς είσαι σήμερα;',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[80vh]">
        {/* Header */}
        <div className="bg-cyprus-blue p-4 flex items-center justify-between text-white shadow-md">
          <div className="flex items-center">
             <div className="relative">
                <img 
                    src="https://picsum.photos/50/50" 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full border-2 border-white"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
             </div>
             <div className="ml-3">
                <h3 className="font-bold text-lg">{recipientName}</h3>
                <span className="text-xs text-blue-200">Ενεργός/ή τώρα</span>
             </div>
          </div>
          <button onClick={onClose} className="text-white hover:bg-blue-800 p-2 rounded-full transition">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-soft-cream space-y-4">
          {messages.map((msg) => {
            if (msg.isSystem) {
                return (
                    <div key={msg.id} className="text-center text-xs text-gray-500 my-2">
                        <span className="bg-gray-200 px-2 py-1 rounded-full">{msg.text}</span>
                    </div>
                );
            }
            const isMe = msg.senderId === 'me';
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${
                  isMe 
                    ? 'bg-cyprus-blue text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <span className={`text-[10px] block mt-1 ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
          <button type="button" className="p-2 text-gray-400 hover:text-gray-600">
            <i className="fa-solid fa-paperclip"></i>
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Γράψτε ένα μήνυμα..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-cyprus-blue focus:ring-1 focus:ring-cyprus-blue transition"
          />
          <button 
            type="submit" 
            disabled={!inputValue.trim()}
            className="p-2 bg-cyprus-blue text-white rounded-full hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition transform active:scale-95 w-10 h-10 flex items-center justify-center"
          >
            <i className="fa-solid fa-paper-plane text-sm"></i>
          </button>
        </form>
      </div>
    </div>
  );
};