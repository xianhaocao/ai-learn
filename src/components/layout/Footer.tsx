import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} AI Learn. 学习 AI，探索未来。
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/about" className="hover:text-white transition">
              关于我们
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              隐私政策
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}