import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

// 生成4位随机码
function generateRandomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// 验证请求数据
const clipSchema = z.object({
  content: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    // 解析请求体
    const body = await request.json();
    
    // 验证数据
    const validation = clipSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: '无效的数据', details: validation.error.format() },
        { status: 400 }
      );
    }
    
    // 生成唯一的四位随机码
    let code = '';
    let isUnique = false;
    
    // 尝试生成唯一的代码
    while (!isUnique) {
      code = generateRandomCode();
      const existingClip = await prisma.clip.findUnique({
        where: { code },
      });
      
      if (!existingClip) {
        isUnique = true;
      }
    }
    
    // 创建新的剪切板条目
    const clip = await prisma.clip.create({
      data: {
        code,
        content: body.content,
        // 设置30天后过期
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
    
    return NextResponse.json({ code: clip.code }, { status: 201 });
  } catch (error) {
    console.error('创建剪切板时出错:', error);
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    );
  }
} 