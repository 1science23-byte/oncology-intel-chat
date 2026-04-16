import React, { useState, useEffect, useRef } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { Message, getChatResponse } from "../../lib/chat-service";
import { Toaster, toast } from "sonner";

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to OncoProtocol AI. I am your specialized clinical assistant for oncology information. I am powered by a standard-level strict database of over 9,000 Q&A records, with an advanced AI Group API fallback for complex diagnostic inquiries. How can I assist you with clinical information today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await getChatResponse(text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        isFallback: response.isFallback,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      toast.error("Critical: Failed to establish secure connection with AI Group API.");
    } finally {
      setIsTyping(false);
    }
  };

  // Using the newly generated logo for OncoProtocol AI
  const logoUrl = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/f8a472b0-3e81-451a-9479-b777c85951f4/oncoprotocol-ai-logo-123370b1-1776278177731.webp";

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans">
      <ChatHeader logoUrl={logoUrl} />
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
           <MessageList messages={messages} isTyping={isTyping} bottomRef={scrollRef} />
        </div>
      </div>
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      <Toaster position="top-center" richColors />
    </div>
  );
};