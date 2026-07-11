import { NextResponse } from 'next/server';
import { addMessage, getMessages } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { name, phone, message } = await request.json();
        const result = addMessage({ name, phone, message, isRead: false });
        return NextResponse.json({ success: true, data: result }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'خطا در ثبت پیام' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const messages = getMessages();
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: 'خطا در دریافت پیام‌ها' }, { status: 500 });
    }
}