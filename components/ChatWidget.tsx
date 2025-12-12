import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, ThumbsUp, ThumbsDown } from 'lucide-react';
import { AnalysisResult } from '../types';
import { sendChatResponse } from '../services/geminiService';

interface ChatWidgetProps {
  analysisResult: AnalysisResult | null;
}

interface Message {
  role: 'user' | 'model';
  text: string;
  liked?: boolean;
  disliked?: boolean;
}

// Custom Gemini-style Sparkle Icon
const GeminiIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C10.5 8 8 10.5 2 12C8 13.5 10.5 16 12 22C13.5 16 16 13.5 22 12C16 10.5 13.5 8 12 2Z" fill="currentColor" />
  </svg>
);

const ChatWidget: React.FC<ChatWidgetProps> = ({ analysisResult }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested Prompts (FAQs)
  const defaultSuggestions = ["What are common scams?", "How do I report fraud?", "Is my password safe?"];
  const contextSuggestions = ["Explain the red flags", "Is this definitely a scam?", "What should I do now?", "Technical details"];
  
  const currentSuggestions = analysisResult ? contextSuggestions : defaultSuggestions;

  // Reset chat when analysis result changes
  useEffect(() => {
    if (analysisResult) {
      setMessages([{
        role: 'model',
        text: `I've analyzed this content. I found ${analysisResult.redFlags.length} red flags. What would you like to know about this report?`
      }]);
    } else {
        setMessages([{
            role: 'model',
            text: "Hi! I'm SecureLens AI. Ask me anything about online scams, cybersecurity, or how to stay safe."
        }]);
    }
  }, [analysisResult]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    setInput('');
    setIsLoading(true);

    // Optimistic update
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);

    try {
      const conversationHistory = messages.map(m => ({ role: m.role, text: m.text })); 

      const responseText = await sendChatResponse(
        conversationHistory, 
        userMessage, 
        analysisResult || undefined
      );

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (index: number, type: 'like' | 'dislike') => {
    setMessages(prev => prev.map((msg, i) => {
      if (i === index) {
        return {
          ...msg,
          liked: type === 'like' ? !msg.liked : false,
          disliked: type === 'dislike' ? !msg.disliked : false
        };
      }
      return msg;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[320px] md:w-[360px] h-[480px] rounded-2xl shadow-2xl border border-slate-200 flex flex-col mb-3 animate-slide-in-up overflow-hidden ring-1 ring-slate-900/5">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg">
                <GeminiIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[13px] tracking-wide">SecureLens Assistant</h3>
                <p className="text-[10px] text-blue-100 opacity-90 font-medium">
                    {analysisResult ? 'Analyzing Current Report' : 'AI Security Expert'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <GeminiIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                )}
                
                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[88%]`}>
                    <div 
                    className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none font-medium'
                    }`}
                    >
                    {msg.text}
                    </div>

                    {/* Feedback Buttons for Model Messages */}
                    {msg.role === 'model' && (
                        <div className="flex gap-2 mt-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => handleFeedback(idx, 'like')}
                                className={`p-0.5 hover:bg-slate-200 rounded transition-colors ${msg.liked ? 'text-green-600' : 'text-slate-400'}`}
                            >
                                <ThumbsUp className="w-3 h-3" />
                            </button>
                            <button 
                                onClick={() => handleFeedback(idx, 'dislike')}
                                className={`p-0.5 hover:bg-slate-200 rounded transition-colors ${msg.disliked ? 'text-red-500' : 'text-slate-400'}`}
                            >
                                <ThumbsDown className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                </div>

                {msg.role === 'user' && (
                    <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
               <div className="flex gap-2.5 justify-start animate-fade-in">
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <GeminiIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white border border-slate-200 px-3 py-2.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1 h-[36px]">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Chips & Input Area */}
          <div className="bg-white border-t border-slate-100">
            {/* Horizontal Chips Scroll */}
            {!isLoading && (
                <div className="flex gap-1.5 overflow-x-auto px-3 py-2 no-scrollbar border-b border-slate-50">
                    {currentSuggestions.map((suggestion, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSend(suggestion)}
                            className="flex-shrink-0 text-[11px] font-medium px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors whitespace-nowrap"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="p-2 relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-[13px] text-slate-700 transition-all placeholder:text-slate-400"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-12 h-12 rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95 ${
            isOpen ? 'bg-slate-800 rotate-90' : 'bg-gradient-to-br from-blue-600 to-indigo-600'
        } text-white`}
      >
        {isOpen ? <X className="w-5 h-5" /> : <GeminiIcon className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default ChatWidget;