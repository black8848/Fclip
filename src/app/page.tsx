'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const clipSchema = z.object({
  content: z.string().min(1, { message: '内容不能为空' }),
});

type ClipFormData = z.infer<typeof clipSchema>;

export default function Home() {
  const [code, setCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClipFormData>({
    resolver: zodResolver(clipSchema),
  });

  const onSubmit = async (data: ClipFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/clips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('提交失败');
      }

      const result = await response.json();
      setCode(result.code);
      reset();
    } catch (error) {
      console.error('提交出错:', error);
      setError('创建剪切板时发生错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {!code ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">创建新剪切板</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  输入要分享的内容
                </label>
                <textarea
                  id="content"
                  {...register('content')}
                  className="w-full p-3 border border-gray-300 rounded-md h-40 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  placeholder="在这里输入文本..."
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                {isLoading ? '处理中...' : '创建剪切板'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-center mb-4">剪切板已创建！</h2>
              <p className="mb-4 text-gray-600">您可以通过以下4位代码访问您的剪切板：</p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-3xl font-mono bg-gray-100 px-6 py-3 rounded-md">{code}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                    alert('代码已复制到剪贴板');
                  }}
                  className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                  title="复制代码"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
              <div className="mb-6">
                <p className="text-gray-600 mb-2">或使用链接访问：</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-mono truncate max-w-[250px]">
                    {`${window.location.origin}/clips/${code}`}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/clips/${code}`);
                      alert('链接已复制到剪贴板');
                    }}
                    className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                    title="复制链接"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link 
                href={`/clips/${code}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                查看我的剪切板
              </Link>
              <button
                onClick={() => setCode(null)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                创建新的剪切板
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
