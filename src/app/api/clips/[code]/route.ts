import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface Params {
  params: {
    code: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { code } = params;
    
    if (!code) {
      return NextResponse.json(
        { error: '需要提供代码' },
        { status: 400 }
      );
    }
    
    // 查找剪切板
    const clip = await prisma.clip.findUnique({
      where: { code },
    });
    
    // 如果不存在或已过期
    if (!clip) {
      return NextResponse.json(
        { error: '找不到剪切板' },
        { status: 404 }
      );
    }
    
    if (clip.expiresAt && new Date(clip.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: '剪切板已过期' },
        { status: 410 }
      );
    }
    
    // 返回剪切板内容
    return NextResponse.json({
      id: clip.id,
      code: clip.code,
      content: clip.content,
      createdAt: clip.createdAt,
      expiresAt: clip.expiresAt,
    });
  } catch (error) {
    console.error('获取剪切板时出错:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
} 