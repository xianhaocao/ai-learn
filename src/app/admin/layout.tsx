import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, Users, Rss, BarChart3, Settings } from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "仪表盘" },
  { href: "/admin/articles", icon: FileText, label: "文章管理" },
  { href: "/admin/sources", icon: Rss, label: "RSS 源" },
  { href: "/admin/users", icon: Users, label: "用户管理" },
  { href: "/admin/stats", icon: BarChart3, label: "数据统计" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // 检查是否是管理员（这里简单处理，实际应该检查用户角色）
  // 可以通过 Clerk 的 metadata 或者数据库来管理
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const isAdmin = user.publicMetadata?.role === "admin" || true; // 临时允许所有人访问

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-white">
            <Settings className="h-6 w-6 text-indigo-500" />
            AI Learn 管理后台
          </Link>
        </div>
        <nav className="px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}