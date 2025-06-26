import { prisma } from '@/lib/db';
import Link from 'next/link';

export default async function ClipsPage() {
  // 获取所有未过期的剪切板，按创建时间降序排列
  const clips = await prisma.clip.findMany({
    where: {
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } }
      ]
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">所有剪切板</h1>
          <Link 
            href="/" 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            创建新剪切板
          </Link>
        </div>

        {clips.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p>暂无剪切板内容</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {clips.map((clip) => (
              <Link 
                key={clip.id} 
                href={`/clips/${clip.code}`}
                className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                    {clip.code}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(clip.createdAt).toLocaleString('zh-CN')}
                  </span>
                </div>
                <div className="line-clamp-3 text-gray-700 text-sm break-words">
                  {clip.content}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata = {
  title: '所有剪切板 | Fclip',
}; 