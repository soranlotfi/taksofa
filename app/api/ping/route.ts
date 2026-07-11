import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('mobletak');
        await db.command({ ping: 1 });
        return NextResponse.json({
            status: '✅ متصل به MongoDB Atlas',
            message: 'اتصال با موفقیت برقرار شد!',
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                status: '❌ اتصال ناموفق',
                error: error.message,
            },
            { status: 500 }
        );
    }
}