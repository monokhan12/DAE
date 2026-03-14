import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, ExternalLink } from 'lucide-react';
import { getMentorResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AiMentor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Salam! I am your AI Mentor. I can help you with DAE job preparation, university admissions (BS/B.Tech), or business ideas. I can also search the web to recommend suitable DAE programs from PBTE, TEVTA, and NAVTTC. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const { text, sources } = await getMentorResponse(userText);
      setMessages(prev => [...prev, { role: 'model', text, sources }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, something went wrong. Please try again.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 h-[calc(100vh-80px)] flex flex-col">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-3">
            <Sparkles className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800">DAE AI Career Mentor</h2>
        <p className="text-slate-500">Powered by Google Gemini with Web Search</p>
      </div>

      <div className="flex-grow bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                
                <div className={`flex ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mx-2 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
                    {msg.role === 'user' ? <User className="text-white w-5 h-5" /> : <Bot className="text-white w-5 h-5" />}
                    </div>

                    {/* Bubble */}
                    <div className={`p-4 rounded-2xl text-sm md:text-base whitespace-pre-wrap ${
                    msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm'
                    } ${msg.isError ? 'border-red-300 bg-red-50 text-red-600' : ''}`}
                    >
                    {msg.text}
                    </div>
                </div>
                
                {/* Sources Section (only for model) */}
                {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 ml-14 max-w-full">
                        <p className="text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">Sources</p>
                        <div className="flex flex-wrap gap-2">
                            {msg.sources.map((source, i) => (
                                <a 
                                    key={i} 
                                    href={source.uri} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-xs bg-white text-blue-600 border border-blue-100 px-3 py-1.5 rounded-full transition-colors hover:bg-blue-50 hover:border-blue-200 shadow-sm"
                                    title={source.title}
                                >
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    <span className="truncate max-w-[150px]">{source.title}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-none ml-14">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about DAE programs, jobs, or admissions..."
              className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white p-2.5 rounded-full transition-colors shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiMentor;
