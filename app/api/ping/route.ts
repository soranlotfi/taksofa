// app/api/ping/route.ts
import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET() {
    try {
        const db = readDB();
        return NextResponse.json({
            status: '✅ دیتابیس JSON در دسترس است',
            productsCount: db.products.length,
            messagesCount: db.messages.length,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                status: '❌ خطا در خواندن دیتابیس',
                error: error.message,
            },
            { status: 500 }
        );
    }
}