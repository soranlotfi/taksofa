import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/db';

// GET: دریافت تنظیمات
export async function GET() {
    try {
        const settings = getSettings();
        return NextResponse.json(settings);
    } catch (error) {
        console.error('❌ خطا در دریافت تنظیمات:', error);
        return NextResponse.json(
            { error: 'خطا در دریافت تنظیمات' },
            { status: 500 }
        );
    }
}

// PUT: بروزرسانی تنظیمات
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const settings = updateSettings(body);
        return NextResponse.json(settings);
    } catch (error) {
        console.error('❌ خطا در بروزرسانی تنظیمات:', error);
        return NextResponse.json(
            { error: 'خطا در بروزرسانی تنظیمات' },
            { status: 500 }
        );
    }
}