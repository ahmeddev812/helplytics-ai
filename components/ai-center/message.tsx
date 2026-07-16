"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Bot, User, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { formatDate } from "@/lib/services";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");
  const isLong = lines.length > 6;

  return (
    <div className="group relative my-3 rounded-xl overflow-hidden border border-slate-200 bg-slate-950">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-white transition-colors"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <><Check className="h-3 w-3 text-emerald-400" /> Copied</>
          ) : (
            <><Copy className="h-3 w-3" /> Copy</>
          )}
        </button>
      </div>
      <div className={cn("overflow-x-auto", !expanded && isLong && "max-h-32")}>
        <pre className="p-4 text-xs leading-relaxed font-mono text-slate-200">
          <code>{code}</code>
        </pre>
      </div>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center gap-1 w-full py-1.5 bg-slate-900/50 text-[10px] text-slate-400 hover:text-slate-200 transition-colors border-t border-slate-800"
        >
          {expanded ? (
            <><ChevronUp className="h-3 w-3" /> Show less</>
          ) : (
            <><ChevronDown className="h-3 w-3" /> Show more ({lines.length} lines)</>
          )}
        </button>
      )}
    </div>
  );
}

function renderMarkdown(content: string) {
  const parts: { type: "text" | "code"; content: string; language?: string }[] = [];
  const codeRegex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: content.slice(lastIndex, match.index) });
    }
    parts.push({ type: "code", content: match[2], language: match[1] || undefined });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    parts.push({ type: "text", content: content.slice(lastIndex) });
  }

  return parts.map((part, i) => {
    if (part.type === "code") {
      return <CodeBlock key={i} code={part.content} language={part.language} />;
    }
    return <MarkdownText key={i} content={part.content} />;
  });
}

function MarkdownText({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  lines.forEach((line, i) => {
    if (line.startsWith("- ") || line.startsWith("* ")) {
      inList = true;
      listItems.push(line.slice(2));
      return;
    }
    if (inList && line.trim() === "") {
      elements.push(
        <ul key={`ul-${i}`} className="list-disc pl-5 space-y-1 my-2">
          {listItems.map((item, j) => (
            <li key={j} className="text-sm text-slate-700">{formatInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
      return;
    }
    if (inList) {
      listItems.push(line.slice(2));
      return;
    }

    if (line.startsWith("# ")) {
      elements.push(<h2 key={i} className="text-lg font-bold text-slate-900 mt-5 mb-2">{formatInline(line.slice(2))}</h2>);
    } else if (line.startsWith("## ")) {
      elements.push(<h3 key={i} className="text-base font-bold text-slate-900 mt-4 mb-2">{formatInline(line.slice(3))}</h3>);
    } else if (line.startsWith("### ")) {
      elements.push(<h4 key={i} className="text-sm font-bold text-slate-900 mt-3 mb-1">{formatInline(line.slice(4))}</h4>);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(<p key={i} className="font-bold text-sm text-slate-700 my-1">{formatInline(line.slice(2, -2))}</p>);
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(<p key={i} className="text-sm text-slate-700 leading-relaxed my-1">{formatInline(line)}</p>);
    }
  });

  if (listItems.length > 0) {
    elements.push(
      <ul key="ul-final" className="list-disc pl-5 space-y-1 my-2">
        {listItems.map((item, j) => (
          <li key={j} className="text-sm text-slate-700">{formatInline(item)}</li>
        ))}
      </ul>
    );
  }

  return <div className="space-y-0.5">{elements}</div>;
}

function formatInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.*?)\*\*|`(.*?)`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={`b-${match.index}`} className="font-semibold">{match[2]}</strong>);
    }
    if (match[3]) {
      parts.push(
        <code key={`c-${match.index}`} className="px-1 py-0.5 rounded bg-slate-100 text-[11px] font-mono text-slate-800">
          {match[3]}
        </code>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
}

export function Message({ role, content, timestamp, isStreaming }: MessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex gap-3 sm:gap-4 w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
        role === "user" ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "shrink-0 flex h-8 w-8 items-center justify-center rounded-xl shadow-sm",
          role === "assistant"
            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
            : "bg-slate-100 text-slate-600"
        )}
      >
        {role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>

      <div className={cn("flex flex-col gap-1 max-w-[85%] sm:max-w-[75%]", role === "user" ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-sm",
            role === "user"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none"
              : "bg-white border border-slate-200 rounded-tl-none"
          )}
        >
          {isStreaming ? (
            <div className="flex items-center gap-1.5 py-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              {renderMarkdown(content)}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 px-1">
          <span className="text-[9px] text-slate-400 font-medium">
            {formatDate(timestamp, "relative")}
          </span>
          {!isStreaming && (
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
              aria-label="Copy message"
            >
              {copied ? (
                <Check className="h-3 w-3 text-emerald-500" />
              ) : (
                <Copy className="h-3 w-3 text-slate-400" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
