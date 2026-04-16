import React, { useState } from "react";
import { Send, Search, Sparkles } from "lucide-react";
import { SUGGESTED_QUESTIONS } from "../../data/cancer-data";
import { Button } from "../ui/button";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="border-t bg-white p-4 pb-6 md:pb-8 shadow-[0_-4px_10px_-5px_rgba(0,0,0,0.05)]">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar pb-1">
          <div className="flex-shrink-0 flex items-center gap-1 px-2 py-1 bg-cyan-50 rounded text-[10px] font-bold text-cyan-700 uppercase tracking-tight">
            <Sparkles className="w-3 h-3" />
            Try:
          </div>
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(q)}
              disabled={disabled}
              className="whitespace-nowrap text-[11px] px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-600 hover:bg-cyan-50 hover:border-cyan-200 hover:text-cyan-700 transition-all disabled:opacity-50 font-medium"
            >
              {q}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about cancer symptoms, treatments, or diagnostics..."
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all text-[13px] md:text-sm disabled:opacity-50 shadow-inner"
              disabled={disabled}
            />
          </div>
          <Button 
            type="submit" 
            size="icon"
            disabled={!input.trim() || disabled}
            className="rounded-2xl bg-cyan-700 hover:bg-cyan-800 h-[50px] w-[50px] flex-shrink-0 shadow-lg shadow-cyan-900/10 transition-all active:scale-95"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
        <p className="text-[9px] text-center text-slate-400 mt-4 font-medium uppercase tracking-widest">
          Secured by Healthcare Compliance Protocols • AI Group API Enabled
        </p>
      </div>
    </div>
  );
};