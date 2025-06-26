import { prisma } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ClipActions from '@/components/ClipActions';

interface ClipPageProps {
  params: {
    code: string;
  };
}

export default async function ClipPage({ params }: ClipPageProps) {
  const { code } = params;
  
  // 查询数据库获取剪切板内容
  const clip = await prisma.clip.findUnique({
    where: { code },
  });
  
  // 如果找不到或已过期，则返回404
  if (!clip || (clip.expiresAt && new Date(clip.expiresAt) < new Date())) {
    notFound();
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">剪切板内容</h1>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
            代码: {code}
          </span>
        </div>
        
        <div className="border rounded-md p-4 bg-gray-50 whitespace-pre-wrap break-words mb-6">
          {clip.content}
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            创建于: {new Date(clip.createdAt).toLocaleString('zh-CN')}
          </div>
          {clip.expiresAt && (
            <div>
              过期于: {new Date(clip.expiresAt).toLocaleString('zh-CN')}
            </div>
          )}
        </div>
        
        <ClipActions content={clip.content} />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: ClipPageProps) {
  return {
    title: `剪切板 ${params.code} | Fclip`,
  };
} 