import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import api from "../api/axios";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! Ask me anything about Agaro High School — news, events, staff, or departments.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async () => {
    const question = input.trim();
    if (!question || sending) return;

    setMessages((current) => [...current, { role: "user", text: question }]);
    setInput("");
    setSending(true);

    try {
      const res = await api.post("/assistant/ask", { question });
      const answer =
        res.data?.data?.answer || "Sorry, I couldn't find an answer to that.";
      setMessages((current) => [
        ...current,
        { role: "assistant", text: answer },
      ]);
    } catch (e) {
      const message =
        e.response?.data?.message ||
        "Sorry, something went wrong. Please try again in a moment.";
      setMessages((current) => [
        ...current,
        { role: "assistant", text: message },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      {open && (
        <div className="mb-3 flex h-[480px] w-[340px] flex-col overflow-hidden rounded-2xl border border-[#e5e1d8] bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#033327] px-4 py-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFDEA4]/70">
                Agaro High School
              </p>
              <p className="font-serif text-sm font-bold text-white">
                Ask a question
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-[#FAF8F5] px-4 py-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-[12px] leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#033327] text-white"
                      : "border border-[#e5e1d8] bg-white text-[#1a1a1a]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="rounded-xl border border-[#e5e1d8] bg-white px-3 py-2 text-[12px] text-gray-400">
                  Thinking…
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-[#e5e1d8] bg-white p-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question…"
              rows={1}
              maxLength={500}
              className="flex-1 resize-none rounded-lg border border-[#e5e1d8] px-3 py-2 text-[12px] outline-none focus:border-[#033327]"
            />
            <button
              type="button"
              onClick={send}
              disabled={!input.trim() || sending}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#033327] text-white disabled:opacity-40"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#033327] text-[#FFDEA4] shadow-lg transition hover:bg-[#0d4a3b]"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
