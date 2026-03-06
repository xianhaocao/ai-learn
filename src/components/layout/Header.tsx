"use client";

import Link from "next/link";
import { useAuth, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Bot, BookOpen, Menu, X, Settings, Wrench, Zap } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { isSignedIn } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <span>AI Learn</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link
            href="/chat"
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            <Bot className="h-4 w-4" />
            AI 对话
          </Link>
          <Link
            href="/articles"
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            <BookOpen className="h-4 w-4" />
            文章
          </Link>
          <Link
            href="/tools"
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            <Wrench className="h-4 w-4" />
            工具库
          </Link>
          <Link
            href="/skills"
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition hover:text-white"
          >
            <Zap className="h-4 w-4" />
            Skills
          </Link>
        </div>

        {/* Auth */}
        <div className="hidden md:flex md:items-center md:gap-4">
          {isSignedIn ? (
            <>
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition hover:text-white"
              >
                <Settings className="h-4 w-4" />
                管理
              </Link>
              <UserButton />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-zinc-400 transition hover:text-white">
                  登录
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500">
                  注册
                </button>
              </SignUpButton>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-zinc-950 p-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/chat"
              className="flex items-center gap-2 text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Bot className="h-4 w-4" />
              AI 对话
            </Link>
            <Link
              href="/articles"
              className="flex items-center gap-2 text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="h-4 w-4" />
              文章
            </Link>
            {isSignedIn && (
              <Link
                href="/admin"
                className="flex items-center gap-2 text-zinc-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="h-4 w-4" />
                管理后台
              </Link>
            )}
            <div className="border-t border-zinc-800 pt-4">
              {isSignedIn ? (
                <UserButton />
              ) : (
                <div className="flex gap-3">
                  <SignInButton mode="modal">
                    <button className="text-sm font-medium text-zinc-400">
                      登录
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
                      注册
                    </button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}