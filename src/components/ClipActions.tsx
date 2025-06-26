'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ClipActionsProps {
  content: string;
}

export default function ClipActions({ content }: ClipActionsProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="mt-6 flex space-x-4 justify-center">
      <button
        onClick={handleCopy}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {isCopied ? '已复制！' : '复制内容'}
      </button>
      
      <Link href="/" className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
        返回首页
      </Link>
    </div>
  );
} 