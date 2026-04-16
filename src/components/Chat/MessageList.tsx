import React from "react";
import { Message } from "../../lib/chat-service";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full gap-3 mb-6",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div className="w-9 h-9 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-1 border border-cyan-200 shadow-sm">
          <Bot className="w-5 h-5 text-cyan-700" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm relative overflow-hidden",
        isBot 
          ? "bg-white border border-slate-100 text-slate-800 rounded-tl-none" 
          : "bg-cyan-700 text-white rounded-tr-none shadow-md"
      )}>
        {message.isFallback && isBot && (
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-cyan-600 uppercase mb-1.5 tracking-widest border-b border-cyan-100 pb-1">
            <Sparkles className="w-3 h-3" />
            AI Group API Fallback Response
          </div>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        <div className={cn(
          "text-[10px] mt-2 flex items-center gap-1",
          isBot ? "text-slate-400" : "text-cyan-100/80"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {!isBot && <span className="text-[8px] opacity-60">Sent</span>}
        </div>
      </div>

      {!isBot && (
        <div className="w-9 h-9 rounded-full bg-cyan-700 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </motion.div>
  );
};

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, bottomRef }) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
      <div className="max-w-3xl mx-auto">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 mb-6"
          >
            <div className="w-9 h-9 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 border border-cyan-200">
              <Bot className="w-5 h-5 text-cyan-700" />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-5 py-3.5 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
};