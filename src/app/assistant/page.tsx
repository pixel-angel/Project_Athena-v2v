"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/footer";

export default function AssistantPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: 'Hi! I\'m HerMap\'s AI assistant 🗺️\n\nI can answer questions about women\'s safety across regions using real review data. Ask me things like:\n• "Which area is safest at night?"\n• "Tell me about Rohini"\n• "How is the lighting in Connaught Place?"\n• "Give me metrics for Bandra"',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      if (data.response) {
        setMessages((prev) => [...prev, { role: "bot", text: data.response }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I'm having trouble connecting to the safety server right now.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div>
      <Navbar />
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FFF5F2]">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col h-[650px] border border-gray-100">
        {/* Header */}
        <div className="bg-[#6d28d9] p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div>
              <h2 className="font-bold text-lg leading-tight">HerMap AI</h2>
              <p className="text-xs text-purple-200">
                Powered by active community review database
              </p>
            </div>
          </div>
          <button
            onClick={() => router.back()}
            className="text-purple-200 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-5 overflow-y-auto bg-white flex flex-col gap-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "bot" && (
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-[#6d28d9]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              <div
                className={`p-4 max-w-[85%] whitespace-pre-wrap ${
                  m.role === "bot"
                    ? "bg-[#f3e8ff] text-gray-800 rounded-2xl rounded-tl-none"
                    : "bg-[#6d28d9] text-white rounded-2xl rounded-tr-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#6d28d9]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="bg-[#f3e8ff] text-purple-600 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                <span className="animate-pulse">●</span>
                <span className="animate-pulse delay-75">●</span>
                <span className="animate-pulse delay-150">●</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="bg-white px-5 pb-3 flex flex-wrap gap-2">
          {[
            "Tell me about Rohini",
            "How safe is Connaught Place?",
            "Metrics for Bandra",
            "Safest region?",
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="text-sm bg-[#f3e8ff] text-[#6d28d9] px-4 py-2 rounded-full hover:bg-purple-200 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 flex gap-2 text-[#2d2d2d]">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-[#6d28d9] transition-all"
            placeholder="Ask about any region's safety..."
          />
          <button
            onClick={() => handleSend(input)}
            disabled={isTyping || !input.trim()}
            className="bg-[#9f7aea] disabled:bg-purple-300 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-purple-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 -rotate-45"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            Send
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
