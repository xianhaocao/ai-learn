"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-zinc-300 prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-indigo-300 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-ul:text-zinc-300 prose-ol:text-zinc-300 prose-li:marker:text-zinc-500 prose-blockquote:border-l-indigo-500 prose-blockquote:text-zinc-400">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            if (href?.startsWith("http")) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );
            }
            return <Link href={href || "#"}>{children}</Link>;
          },
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match;
            
            if (isInline) {
              return (
                <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-indigo-300 text-sm" {...props}>
                  {children}
                </code>
              );
            }
            
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 overflow-x-auto">
              {children}
            </pre>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 text-zinc-300">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 text-zinc-300">{children}</ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-zinc-400">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}