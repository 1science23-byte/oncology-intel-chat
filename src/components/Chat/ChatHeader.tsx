import React from "react";
import { ShieldAlert, Info } from "lucide-react";

interface ChatHeaderProps {
  logoUrl: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ logoUrl }) => {
  return (
    <div className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
            <img src={logoUrl} alt="OncoProtocol AI Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-none">OncoProtocol AI</h1>
            <p className="text-xs text-slate-600 font-medium">9,000+ Strict Clinical Records \u2022 AI Group API Fallback</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
          <ShieldAlert className="w-4 h-4 text-blue-600" />
          <span className="text-[10px] font-semibold text-blue-700 uppercase tracking-wider">Standard Level Strict</span>
        </div>
      </div>
      <div className="bg-slate-900 text-slate-50 py-1.5 px-4 text-center text-[11px] font-medium">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <Info className="w-3 h-3 text-cyan-400" />
          CLINICAL NOTICE: This protocol-based assistant provides informational support and does not replace professional medical diagnosis.
        </div>
      </div>
    </div>
  );
};