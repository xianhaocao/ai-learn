import { prisma } from "@/lib/prisma";

export default async function UsersAdminPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      imageUrl: true,
      createdAt: true,
      _count: {
        select: { conversations: true },
      },
    },
  });

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">用户管理</h1>

      {/* Users Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
        <table className="w-full">
          <thead className="border-b border-zinc-800 bg-zinc-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">用户</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">邮箱</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">对话数</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">注册时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                  暂无注册用户
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-800/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white">
                        {user.name?.[0] || user.email?.[0] || "?"}
                      </div>
                      <span className="font-medium">{user.name || "未设置"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{user.email || "-"}</td>
                  <td className="px-6 py-4">{user._count.conversations}</td>
                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {new Date(user.createdAt).toLocaleDateString("zh-CN")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}