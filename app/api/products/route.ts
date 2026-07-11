import { NextResponse } from 'next/server';
import { getProducts, addProduct } from '@/lib/db';

export async function GET() {
    try {
        const products = getProducts().filter((p: any) => p.isActive !== false);
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: 'خطا در دریافت محصولات' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const product = addProduct(body);
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'خطا در ایجاد محصول' }, { status: 500 });
    }
}